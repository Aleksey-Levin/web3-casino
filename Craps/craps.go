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

	// Parse hash of forint contract from incoming data
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
	isWin := isWinner(firstSum, secondSum)
	if (isWin){
		changePlayerBalance(ctx, playerOwner, bet)
	} else {
		changePlayerBalance(ctx, playerOwner, -bet)
	}
}

func isWinner(firstSum int, secondSum int) bool {
	if (!((firstSum >= 2 && firstSum <= 12) && (secondSum >= 2 && firstSum <= 12))){
		panic("first and second sum should be from 2 to 12")
	}

	sum := 0
	for i:=0; i<2; i++ {
		crap := (runtime.GetRandom() % 6) + 1
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
		// Transfer funds from contract to player owner
		from = playerContract
		to = playerOwner
		transferAmount = balanceChange
	} else {
		// Transfer funds from player owner to contract
		from = playerOwner
		to = playerContract
		transferAmount = -balanceChange // We flip sender/receiver, but keep amount positive
	}

	transferred := contract.Call(zaCoinHash, "transfer", contract.All, from, to, transferAmount, nil).(bool)
	if !transferred {
		panic("failed to transfer zaCoins")
	}
}

