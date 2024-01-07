package Exchanger

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

func BuyZaCoin(gasCount int) bool {
	playerOwner := runtime.GetScriptContainer().Sender

	playerBalance := gas.BalanceOf(playerOwner)

	if playerBalance < gasCount {
		panic("Insufficient funds")
	}

	contractHash := runtime.GetExecutingScriptHash()
	transferredGas := gas.Transfer(playerOwner, contractHash, gasCount, nil).(bool)

	if !transferredGas {
		panic("failed to transfer gas")
	}
	resultAmountZaCoin := gasCount * 57
	transferredZaCoin := contract.Call(zaCoinHash, "transfer", contract.All, contractHash, playerBalance, resultAmountZaCoin, nil).(bool)

	if !transferredZaCoin {
		panic("failed to transfer zaCoins")
	} else {
		runtime.Log("Gas balance: ", gas.BalanceOf(playerOwner))
		runtime.Log("ZaCoin balance: ", contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner))
	}

	return transferredZaCoin
}
