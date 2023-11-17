package Craps

import (
	"github.com/nspcc-dev/neo-go/pkg/interop/runtime"
)

func IsWinner(firstSum int, secondSum int) bool {
	if (!((firstSum >= 3 && firstSum <= 18) && (secondSum >= 3 && firstSum <= 18))){
		panic("first and second sum should be from 3 to 36")
	}

	sum := 0

	for i:=0; i<3; i++ {
		crap := randomInRange(1, 6)
        	runtime.Notify("Crup number: %d,Random Number: %d", i+1,  randomNumber)
		sum += crup
	}

	return sum == firstSum || sum == secondSum
}

