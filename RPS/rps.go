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

type Result struct {
	win  bool
	tie  bool
	lose bool
}

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

func PlayRPS(playerChoice string, bet int) {

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

	if playerChoice != "rock" && playerChoice != "paper" && playerChoice != "scissors" {
		panic("invalid player choice")
	}

	computerChoice := (runtime.GetRandom() % 3) + 1
	runtime.Notify("computerChoice", computerChoice)

	var computerChoiceString string
	switch computerChoice {
	case 0:
		computerChoiceString = "rock"
	case 1:
		computerChoiceString = "paper"
	case 2:
		computerChoiceString = "scissors"
	}

	result := isWinner(playerChoice, computerChoiceString)

	if result.tie {
		panic("game tied: player chose " + playerChoice + ", computer chose " + computerChoiceString)
	} else if result.win {
		changePlayerBalance(ctx, playerOwner, bet)
	} else {
		panic("player lost: player chose " + playerChoice + ", computer chose " + computerChoiceString)
	}

	playerBalance = contract.Call(zaCoinHash, "balanceOf", contract.ReadStates, playerOwner).(int)
	runtime.Notify("playerBalance", playerBalance)
}

func isWinner(playerChoice, computerChoice string) Result {

	if playerChoice == computerChoice {
		return Result{tie: true}
	}

	if playerChoice == "rock" && computerChoice == "scissors" {
		return Result{win: true}
	}

	if playerChoice == "scissors" && computerChoice == "paper" {
		return Result{win: true}
	}

	if playerChoice == "paper" && computerChoice == "rock" {
		return Result{win: true}
	}

	return Result{lose: true}
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
