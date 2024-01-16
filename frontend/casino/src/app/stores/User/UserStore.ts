import { makeAutoObservable } from 'mobx'

export class UserStore {
    balance: string | undefined = undefined
    constructor() {
        makeAutoObservable(this)
    }

    setBalance(balance: string) {
        this.balance = balance
        console.log(balance)
    }
}
