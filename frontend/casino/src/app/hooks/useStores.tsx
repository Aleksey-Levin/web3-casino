import { observer } from 'mobx-react-lite'
import { createContext, type PropsWithChildren, useContext } from 'react'

import { type RootStore, rootStore } from '../stores/RootStore'

export const StoreContext = createContext<RootStore>(rootStore)

export const StoreProvider = observer(function StoreProvider({
  children,
// eslint-disable-next-line @typescript-eslint/ban-types
}: PropsWithChildren): JSX.Element {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  )
})

export function useStores(): RootStore {
  return useContext(StoreContext)
}
