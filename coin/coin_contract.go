package coin

import (
        "github.com/nspcc-dev/neo-go/pkg/interop/runtime"
)

func IsWinner(playerName string) bool {
        if playerName == "demo" {
                return true
        }
        random := runtime.GetRandom()
        return random%2 == 0
}
