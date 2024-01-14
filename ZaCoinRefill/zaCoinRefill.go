package Exchanger

import (
	"github.com/nspcc-dev/neo-go/pkg/interop"
	"github.com/nspcc-dev/neo-go/pkg/interop/contract"
	"github.com/nspcc-dev/neo-go/pkg/interop/runtime"
	"github.com/nspcc-dev/neo-go/pkg/interop/storage"
)

const (
	zaCoinHashKey = "zaCoinHash"
	minZaCoin = 5
	zaCoinForTransfer = 50
)


func _deploy(data interface{}, isUpdate bool) {
	if isUpdate {
		return
	}

	args := data.(struct {
		zaCoinHash interop.Hash160
	})

	if len(args.zaCoinHash) != interop.Hash160Len {
		panic("Invalid hash of zaCoin contract")
	}

	ctx := storage.GetContext()
	storage.Put(ctx, zaCoinHashKey, args.zaCoinHash)
}

func GetZaCoin() {
	ctx := storage.GetContext()
	playerOwner := runtime.GetScriptContainer().Sender

	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)
	playerBalance := contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
	if playerBalance < minZaCoin {
		changePlayerBalance(ctx, playerOwner, zaCoinForTransfer)
	}

	playerBalance = contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
        runtime.Notify("playerBalance", playerBalance)

}

func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

	callingHash := runtime.GetCallingScriptHash()
	if !callingHash.Equals(zaCoinHash) {
		panic("only ZC is accepted")
	}
}


func changePlayerBalance(ctx storage.Context, playerOwner interop.Hash160, transferAmount int) {
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)
	playerContract := runtime.GetExecutingScriptHash()

	transferred := contract.Call(zaCoinHash, "transfer", contract.All,  playerContract, playerOwner, transferAmount, nil).(bool)
	if !transferred {
		panic("failed to transfer zaCoins")
	}
}
