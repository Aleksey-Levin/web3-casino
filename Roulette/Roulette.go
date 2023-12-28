package Roulette

import (
	"github.com/nspcc-dev/neo-go/pkg/interop"
	"github.com/nspcc-dev/neo-go/pkg/interop/contract"
	"github.com/nspcc-dev/neo-go/pkg/interop/runtime"
	"github.com/nspcc-dev/neo-go/pkg/interop/storage"
)

const (
	zaCoinHashKey = "zaCoinHash"
)

func _deploy(data interface{}, isUpdate bool) {
	if isUpdate {
		return
	}

	args := data.(struct {
		zaCoinHash interop.Hash160
	})

	if len(args.zaCoinHash) != interop.Hash160Len {
		panic("invalid hash of zaCoin contract")
	}

	ctx := storage.GetContext()
	storage.Put(ctx, zaCoinHashKey, args.zaCoinHash)
}

func PlayRoulette(bet int, selectedNumber int) {
	ctx := storage.GetContext()
	playerOwner := runtime.GetScriptContainer().Sender

	if bet <= 0 {
		panic("Invalid bet amount")
	}

	playerBalance := contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
	if playerBalance < bet {
		panic("Insufficient funds")
	}

	if selectedNumber < 1 || selectedNumber > 36 {
		panic("Illegal number selected for roulette")
	}

	isWin := isWinner(selectedNumber)
	if isWin {
		winAmount := calculateWinAmount(bet, selectedNumber)
		changePlayerBalance(ctx, playerOwner, winAmount)
	} else {
		changePlayerBalance(ctx, playerOwner, -bet)
	}
}

func isWinner(selectedNumber int) bool {
	rouletteNumber := (runtime.GetRandom() % 36) + 1
	return rouletteNumber == selectedNumber
}

func calculateWinAmount(bet int, selectedNumber int) int {
	coefficients := map[int]int{
		1: 36,
		2: 18,
		3: 2,
	}

	if coefficient, ok := coefficients[selectedNumber]; ok {
		return bet * coefficient
	}

	return 0
}

func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

	callingHash := runtime.GetCallingScriptHash()
	if !callingHash.Equals(zaCoinHash) {
		panic("only ZC is accepted")
	}
}

func changePlayerBalance(ctx storage.Context, playerOwner interop.Hash160, balanceChange int) {
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)
	playerContract := runtime.GetExecutingScriptHash()

	var from, to interop.Hash160
	var transferAmount int
	if balanceChange > 0 {
		from = playerContract
		to = playerOwner
		transferAmount = balanceChange
	} else {
		from = playerOwner
		to = playerContract
		transferAmount = -balanceChange
	}

	transferred := contract.Call(zaCoinHash, "transfer", contract.All, from, to, transferAmount, nil).(bool)
	if !transferred {
		panic("failed to transfer zaCoins")
	}
}
