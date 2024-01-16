package rps

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

func PlayRPS(playerChoice int, bet int) {

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

	if playerChoice <= 0 || playerChoice > 3 {
		panic("invalid player choice")
	}

	computerChoice := (runtime.GetRandom() % 3) + 1
	runtime.Notify("computerChoice", computerChoice)

	result := isWinner(playerChoice, computerChoice)

	if result == 1 {
		changePlayerBalance(playerContract, playerOwner, bet)
                runtime.Notify("gameResult", result)
	} else if result == 0 {
		changePlayerBalance(playerOwner, playerContract, bet)
                runtime.Notify("gameResult", result)
       	} else {
		runtime.Log("game tied")
                runtime.Notify("gameResult", result)
	}

	playerBalance = contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
        runtime.Notify("playerBalance", playerBalance)
}

func isWinner(playerChoice int, computerChoice int) int {

	if playerChoice == computerChoice {
		return 2
	}

	if playerChoice == 1 && computerChoice == 3 {
		return 1
	}

	if playerChoice == 3 && computerChoice == 2 {
		return 1
	}

	if playerChoice == 2 && computerChoice == 1 {
		return 1
	}

	return 0
}

func OnNEP17Payment(from interop.Hash160, amount int, data any) {
	ctx := storage.GetContext()
	zaCoinHash := storage.Get(ctx, zaCoinHashKey).(interop.Hash160)

	callingHash := runtime.GetCallingScriptHash()
	if !callingHash.Equals(zaCoinHash) {
		panic("only ZC is accepted")
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
