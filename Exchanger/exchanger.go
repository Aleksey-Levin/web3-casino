package Exchanger

import (
	"github.com/nspcc-dev/neo-go/pkg/interop"
	"github.com/nspcc-dev/neo-go/pkg/interop/contract"
	"github.com/nspcc-dev/neo-go/pkg/interop/runtime"
	"github.com/nspcc-dev/neo-go/pkg/interop/storage"
	"github.com/nspcc-dev/neo-go/pkg/interop/native/gas"
	"github.com/nspcc-dev/neo-go/pkg/interop/lib/address"
	//"github.com/nspcc-dev/neo-go/pkg/interop/util"
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
		panic("Invalid hash of zaCoin contract")
	}

	ctx := storage.GetContext()
	storage.Put(ctx, zaCoinHashKey, args.zaCoinHash)
}

func BuyZaCoin(count int) {
	ctx := storage.GetContext()
	playerOwner := runtime.GetScriptContainer().Sender

	//balanceBefore := gas.BalanceOf(runtime.GetExecutingScriptHash())
	gasTransfer(playerOwner, count)
	//balanceAfter := gas.BalanceOf(runtime.GetExecutingScriptHash())

	changePlayerBalance(ctx, playerOwner, count)
	//if (balanceBefore - balanceAfter == count) {
	//	changePlayerBalance(ctx, playerOwner, count)
	//} else {
	//	util.Abort()
	//}
}

func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	zacoinStr := "zacoin"
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

	callingHash := runtime.GetCallingScriptHash()
	if data == zacoinStr {
		if !callingHash.Equals(zaCoinHash) {
			panic("only ZC is accepted")
		}
	} else {
		if !callingHash.Equals(gas.Hash) {
		panic("only GAS is accepted")
		}
	}
}

func gasTransfer(playerOwner interop.Hash160, gasCount int) {
	contractHash := runtime.GetExecutingScriptHash()


        transferredGas := gas.Transfer(playerOwner, contractHash, gasCount, nil)

        if !transferredGas {
              panic("Failed to transfer gas")
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

	transferred := contract.Call(zaCoinHash, "transfer", contract.All, from, to, transferAmount, "zacoin").(bool)
	if !transferred {
		panic("failed to transfer zaCoins")
	}
}
