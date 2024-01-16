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
	playerContract := runtime.GetExecutingScriptHash()

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
		changePlayerBalance(playerOwner, playerContract, bet)
                runtime.Notify("gameResult", int(0))
	} else {
		win := res * bet
		changePlayerBalance(playerContract, playerOwner, win)
                runtime.Notify("gameResult", int(1))
	}
	playerBalance = contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
        runtime.Notify("playerBalance", playerBalance)
}

func roll() int {
	var result []int
	for i:=0; i<3; i++ {
		wheel := (runtime.GetRandom() % 8) + 1
        	result = append(result, wheel)
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

func changePlayerBalance(sender interop.Hash160, recipient interop.Hash160, balanceChange int) {
	ctx := storage.GetContext()
        zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

        transferred := contract.Call(zaCoinHash, "transfer", contract.All, sender, recipient, balanceChange, nil).(bool)
        if !transferred {
                panic("failed to transfer zaCoins")
        }
}
