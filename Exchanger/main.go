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

func BuyZaCoin(count int, player interop.Hash160) {
	
	playerOwner := runtime.GetScriptContainer().Sender

	if !runtime.CheckWitness(playerOwner) {
                panic("Player is not the same as the caller")
        }
        contractHash := runtime.GetExecutingScriptHash()


        transferredGas := gas.Transfer(playerOwner, contractHash, count, nil)

        if !transferredGas {
              panic("Failed to transfer gas")
        }

	balanceAfter := gas.BalanceOf(runtime.GetExecutingScriptHash())
	runtime.Notify("balanceAfter", balanceAfter)
	balanceUser := gas.BalanceOf(playerOwner)
	runtime.Notify("balanceUser", balanceUser)
	//balanceBefore := gas.BalanceOf(runtime.GetExecutingScriptHash())
	//gasTransfer(player, count)
	//balanceAfter := gas.BalanceOf(runtime.GetExecutingScriptHash())

	//changePlayerBalance(ctx, playerOwner, count)
	//if (balanceBefore - balanceAfter == count) {
	//	changePlayerBalance(ctx, playerOwner, count)
	//} else {
	//	util.Abort()
	//}
}

func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	contractHash := runtime.GetExecutingScriptHash()
	balance := gas.BalanceOf(contractHash)
	runtime.Log("Contract's balance changed and has "+ string(balance)+" gas")
}

func gasTransfer(playerOwner interop.Hash160, gasCount int) {
	if !runtime.CheckWitness(playerOwner) {
		panic("Player is not the same as the caller")
	}
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
