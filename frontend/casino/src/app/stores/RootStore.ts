import { UserStore } from './User/UserStore'

export class RootStore {
  userStore: UserStore

  constructor() {
    this.userStore = new UserStore()
  }
}

export const rootStore = new RootStore()
