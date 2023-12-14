import 'reseter.css/css/minireseter.css'

import { observer } from 'mobx-react-lite'
import { type FC, type PropsWithChildren } from 'react'

import { globalStyles } from './global'

export const StitchesProvider: FC<PropsWithChildren> = observer(({ children }) => {
  globalStyles()

  // currently, there is nothing provided, but in future this will likely to change
  return <>{children}</>
})
