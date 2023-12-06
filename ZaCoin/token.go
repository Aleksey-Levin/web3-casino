/*
The implementation of the token logic has been copied "as is" from neo-go:
https://github.com/nspcc-dev/neo-go/blob/7a1bf77585a37302ddfae78b2c88ed472f66cbcc/examples/token/nep17/nep17.go

The code is subject to the following license:

MIT License

Copyright (c) 2018-2023 NeoSPCC (@nspcc-dev), Anthony De Meulemeester (@anthdm), City of Zion community (@CityOfZion)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

package ZaCoin

import (
	"github.com/nspcc-dev/neo-go/pkg/interop"
	"github.com/nspcc-dev/neo-go/pkg/interop/contract"
	"github.com/nspcc-dev/neo-go/pkg/interop/native/management"
	"github.com/nspcc-dev/neo-go/pkg/interop/runtime"
	"github.com/nspcc-dev/neo-go/pkg/interop/storage"
)

// Token holds all token info
type Token struct {
	// Token name
	Name string
	// Ticker symbol
	Symbol string
	// Amount of decimals
	Decimals int
	// Token owner address
	Owner []byte
	// Total tokens * multiplier
	TotalSupply int
	// Storage key for circulation value
	CirculationKey string
}

// getIntFromDB is a helper that checks for nil result of storage.Get and returns
// zero as the default value.
func getIntFromDB(ctx storage.Context, key []byte) int {
	var res int
	val := storage.Get(ctx, key)
	if val != nil {
		res = val.(int)
	}
	return res
}

// GetSupply gets the token totalSupply value from VM storage
func (t Token) GetSupply(ctx storage.Context) int {
	return getIntFromDB(ctx, []byte(t.CirculationKey))
}

// BalanceOf gets the token balance of a specific address
func (t Token) BalanceOf(ctx storage.Context, holder []byte) int {
	return getIntFromDB(ctx, holder)
}

// Transfer token from one user to another
func (t Token) Transfer(ctx storage.Context, from, to interop.Hash160, amount int, data any) bool {
	amountFrom := t.CanTransfer(ctx, from, to, amount)
	if amountFrom == -1 {
		return false
	}

	if amountFrom == 0 {
		storage.Delete(ctx, from)
	}

	if amountFrom > 0 {
		diff := amountFrom - amount
		storage.Put(ctx, from, diff)
	}

	amountTo := getIntFromDB(ctx, to)
	totalAmountTo := amountTo + amount
	if totalAmountTo != 0 {
		storage.Put(ctx, to, totalAmountTo)
	}

	runtime.Notify("Transfer", from, to, amount)
	if to != nil && management.GetContract(to) != nil {
		contract.Call(to, "onNEP17Payment", contract.All, from, amount, data)
	}
	return true
}

// CanTransfer returns the amount it can transfer
func (t Token) CanTransfer(ctx storage.Context, from []byte, to []byte, amount int) int {
	if len(to) != 20 || !IsUsableAddress(from) {
		return -1
	}

	amountFrom := getIntFromDB(ctx, from)
	if amountFrom < amount {
		return -1
	}

	// Tell Transfer the result is equal - special case since it uses Delete
	if amountFrom == amount {
		return 0
	}

	// return amountFrom value back to Transfer, reduces extra Get
	return amountFrom
}

// IsUsableAddress checks if the sender is either the correct Neo address or SC address
func IsUsableAddress(addr []byte) bool {
	if len(addr) == 20 {

		if runtime.CheckWitness(addr) {
			return true
		}

		// Check if a smart contract is calling scripthash
		callingScriptHash := runtime.GetCallingScriptHash()
		if callingScriptHash.Equals(addr) {
			return true
		}
	}

	return false
}

// Mint initial supply of tokens
func (t Token) Mint(ctx storage.Context, to interop.Hash160) bool {
	if !IsUsableAddress(t.Owner) {
		return false
	}
	minted := storage.Get(ctx, []byte("minted"))
	if minted != nil && minted.(bool) == true {
		return false
	}

	storage.Put(ctx, to, t.TotalSupply)
	storage.Put(ctx, []byte("minted"), true)
	storage.Put(ctx, []byte(t.CirculationKey), t.TotalSupply)
	var from interop.Hash160
	runtime.Notify("Transfer", from, to, t.TotalSupply)
	return true
}
