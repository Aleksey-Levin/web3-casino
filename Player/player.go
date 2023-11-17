package Player

import (
	"github.com/nspcc-dev/neo-go/pkg/interop/native/oracle"
	"github.com/nspcc-dev/neo-go/pkg/interop/native/std"
	"github.com/nspcc-dev/neo-go/pkg/interop/runtime"
	"github.com/nspcc-dev/neo-go/pkg/interop/storage"
	"github.com/nspcc-dev/neo-go/pkg/interop/lib/address"
	"github.com/nspcc-dev/neo-go/pkg/interop/contract"
)

type Player struct {
	balance int
}

func _deploy(data interface{}, isUpdate bool) {
	if isUpdate {
		return
	}

}


func NewPlayer(playerName string) {
	ctx := storage.GetContext()

	existingPlayer := storage.Get(ctx, playerName)
	if existingPlayer != nil {
		panic("player already exists")
	}

	player := Player{
		balance: 0,
	}

	storage.Put(ctx, playerName, std.Serialize(player))
}

func  ReplenishBalance(playerName string, balance int) {

}

func playCraps(plyerName string, bet int, firstSum int, secondSum int) {
	player := getPlayer(playerName)
	if bet <= player.balance {
		panic("not enough money on the balance sheet")
	}
	
	crapsHash := address.ToHash160("сюда надо hash смартконтракта Craps")
	isWinner := contract.Call(crapsHash, "isWinner", contract.ReadOnly, firstSum, secondSum).(bool)
	
	if isWinner {
		player.balance += bet	
	}
	else {
		player.balance -= bet
	}
} 

func getPlayer(playerName string) Player {
	ctx := storage.GetReadOnlyContext()
	data := storage.Get(ctx, playerName)
	if data == nil {
		panic("player not found")
	}

	return std.Deserialize(data.([]byte)).(Player)
}

func Balance(playerName string) int {
	p := getPlayer(playerName)
	return p.balance
}
