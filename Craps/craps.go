package Craps

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

func PlayCraps(bet int, firstSum int, secondSum int) {
	ctx := storage.GetContext()
	playerOwner := runtime.GetScriptContainer().Sender

	if bet <= 0 {
		panic("Invalid bet amount")
	}

	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)
	playerBalance := contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
	if playerBalance < bet {
		panic("Insufficient funds")
	}

	isWin := isWinner(firstSum, secondSum)
	if (isWin){
		changePlayerBalance(ctx, playerOwner, bet)
	} else {
		changePlayerBalance(ctx, playerOwner, -bet)
	}
	playerBalance = contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
        runtime.Notify("playerBalance", playerBalance)
}

func isWinner(firstSum int, secondSum int) bool {
	if (!((firstSum >= 2 && firstSum <= 12) && (secondSum >= 2 && firstSum <= 12))){
		panic("first and second sum should be from 2 to 12")
	}

	sum := 0
	for i:=0; i<2; i++ {
		crap := (runtime.GetRandom() % 6) + 1
		runtime.Log("Crup number " + string(i+1) + " Rundom number " + string(crap))
		runtime.Notify("Crup number", i+1)
		runtime.Notify("Random number", crap)
		sum += crap
	}

	return sum == firstSum || sum == secondSum
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

