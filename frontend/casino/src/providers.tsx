import { observer } from 'mobx-react-lite'
import { type FC, type PropsWithChildren } from 'react'
import { StitchesProvider } from './styles/provider'

export const Providers: FC<PropsWithChildren> = observer(({ children }) => {
  return (
    <StitchesProvider>
      {children}
    </StitchesProvider>
  )
})
