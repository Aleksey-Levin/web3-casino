package Exchanger

import (
	"github.com/nspcc-dev/neo-go/pkg/interop"
	"github.com/nspcc-dev/neo-go/pkg/interop/contract"
	"github.com/nspcc-dev/neo-go/pkg/interop/runtime"
	"github.com/nspcc-dev/neo-go/pkg/interop/storage"
	"github.com/nspcc-dev/neo-go/pkg/interop/native/gas"
	"github.com/nspcc-dev/neo-go/pkg/interop/lib/address"
)

const (
	zaCoinHashKey = "zaCoinHash"
)

var walletAddress = address.ToHash160("NXbLSnHA8dNuMUPUSNNivx7XFucN1w5bRq")

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
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)
	playerOwner := runtime.GetScriptContainer().Sender

	playerBalance := gas.BalanceOf(playerOwner)

	if playerBalance < gasCount {
		panic("Insufficient funds")
	}

	//contractHash := runtime.GetExecutingScriptHash()
	transferredGas := gas.Transfer(playerOwner, walletAddress, gasCount, nil)

	if !transferredGas {
		panic("failed to transfer gas")
	}
	resultAmountZaCoin := gasCount * 57
	transferredZaCoin := contract.Call(zaCoinHash, "transfer", contract.All, walletAddress, playerBalance, resultAmountZaCoin, nil).(bool)

	if !transferredZaCoin {
		panic("Failed to transfer zaCoins")
	} else {
		runtime.Log("Gas balance: "+ string(gas.BalanceOf(playerOwner)))
		//runtime.Log("ZaCoin balance: " + string(contract.Call(zaCoinHash) + "balanceOf" +string(contract.ReadStates) + string(playerOwner)))
	}

	return transferredZaCoin
}


func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

	callingHash := runtime.GetCallingScriptHash()
	if !callingHash.Equals(zaCoinHash) {
		panic("Only ZC is accepted")
	}
}
