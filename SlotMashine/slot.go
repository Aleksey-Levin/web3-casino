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

func RollSlot(bet int) {
	ctx := storage.GetContext()
	playerOwner := runtime.GetScriptContainer().Sender
	res := Roll()
	if (res == 0){
		changePlayerBalance(ctx, playerOwner, -bet)
	} else {
		win := res * bet
		changePlayerBalance(ctx, playerOwner, win)
	}
}

func Roll() int {
	wheelNumber:="Wheel number: "
	value:=" Value: "
	firstWheel := (runtime.GetRandom() % 8) + 1
	runtime.Notify(wheelNumber, 1, value, firstWheel)

	secondWheel := (runtime.GetRandom() % 8) + 1
	runtime.Notify(wheelNumber, 2, value, secondWheel)

	thirdWheel := (runtime.GetRandom() % 8) + 1
	runtime.Notify(wheelNumber, 3, value, thirdWheel)

	if (firstWheel == secondWheel && firstWheel == thirdWheel){
		return firstWheel
	} else {
		return 0
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
