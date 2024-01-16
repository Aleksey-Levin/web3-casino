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
	playerContract := runtime.GetExecutingScriptHash()

	if bet <= 0 {
		panic("Invalid bet amount")
	}
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)
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
		changePlayerBalance(playerContract, playerOwner, winAmount)
                runtime.Notify("gameResult", int(1))
	} else {
		changePlayerBalance(playerOwner, playerContract, bet)
                runtime.Notify("gameResult", int(0))
	}
	playerBalance = contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
	runtime.Notify("playerBalance", playerBalance)
}

func isWinner(selectedNumber int) bool {
	rouletteNumber := (runtime.GetRandom() % 36) + 1
	runtime.Notify("rouletteNumber", rouletteNumber)
	runtime.Log("rouletteNumber " + string(rouletteNumber))
	return rouletteNumber == selectedNumber
}

func calculateWinAmount(bet int, selectedNumber int) int {
	coefs := []int{10, 20, 30, 2}
 	if selectedNumber == 36 {
  		return bet * coefs[0]
 	} else if selectedNumber == 18 {
 	 	return bet * coefs[1]
 	} else if  selectedNumber == 2 {
  		return bet * coefs[2]
 	} else {
  		return bet * coefs[3]
 	}
}

func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

	callingHash := runtime.GetCallingScriptHash()
	if !callingHash.Equals(zaCoinHash) {
		panic("only ZC is accepted")
	}
}

func changePlayerBalance(sender interop.Hash160, recipient interop.Hash160, balanceChange int) {
	ctx := storage.GetContext()
        zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

        transferred := contract.Call(zaCoinHash, "transfer", contract.All, sender, recipient, balanceChange, nil).(bool)
        if !transferred {
                panic("failed to transfer zaCoins")
        }
}
