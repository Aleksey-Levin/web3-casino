package ZaCoin

import (
	"github.com/nspcc-dev/neo-go/pkg/interop"
	"github.com/nspcc-dev/neo-go/pkg/interop/lib/address"
	"github.com/nspcc-dev/neo-go/pkg/interop/storage"
)

func getToken() Token {
	owner := address.ToHash160("NXbLSnHA8dNuMUPUSNNivx7XFucN1w5bRq")
	token := Token{
		Name:           "ZaCoin",
		Symbol:         "ZC",
		Decimals:       0,
		Owner:          owner,
		TotalSupply:    1000000,
		CirculationKey: "TokenCirculation",
	}
	return token
}

// Symbol returns the token symbol.
func Symbol() string {
	return getToken().Symbol
}

// Decimals returns the number of digits after decimal point.
func Decimals() int {
	return getToken().Decimals
}

// TotalSupply returns the total amount of tokens.
func TotalSupply() int {
	ctx := storage.GetReadOnlyContext()
	return getToken().GetSupply(ctx)
}

// BalanceOf returns the amount of tokens owned by the specified address.
func BalanceOf(holder interop.Hash160) int {
	ctx := storage.GetReadOnlyContext()
	return getToken().BalanceOf(ctx, holder)
}

// Transfer moves token from one address to another.
func Transfer(from interop.Hash160, to interop.Hash160, amount int, data any) bool {
	ctx := storage.GetContext()
	return getToken().Transfer(ctx, from, to, amount, data)
}

// Mint generates initial supply of tokens.
func Mint(to interop.Hash160) {
	ctx := storage.GetContext()
	minted := getToken().Mint(ctx, to)
	if !minted {
		panic("Failed  to mint initial supply")
	}
}
