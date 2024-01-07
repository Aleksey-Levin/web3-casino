package SlotMashine

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
                panic("Invalid hash of zaCoin contract")
        }


	ctx := storage.GetContext()
	storage.Put(ctx, zaCoinHashKey, args.zaCoinHash)
}

func RollSlot(bet int) {
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

	res := roll()
	if (res == 0){
		changePlayerBalance(ctx, playerOwner, -bet)
	} else {
		win := res * bet
		changePlayerBalance(ctx, playerOwner, win)
	}
	playerBalance = contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
        runtime.Notify("playerBalance", playerBalance)
}

func roll() int {
	var result [3]int
	for i:=0; i<3; i++ {
		wheel := (runtime.GetRandom() % 8) + 1
        	result[i] = wheel
        	runtime.Log("WheelNumber=" + string(i + 1) +", value="+string(wheel))
	}
	runtime.Notify("SlotResult", result)


	if (result[0] == result[1] && result[0] == result[2]){
		return result[0]
	} else {
		return 0
	}

}


func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

	callingHash := runtime.GetCallingScriptHash()
	if !callingHash.Equals(zaCoinHash) {
		panic("Only ZC is accepted")
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
