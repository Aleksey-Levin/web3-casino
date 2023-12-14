import { observer } from 'mobx-react-lite'
import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

import { useScrollTop } from '../../../hooks/useScrollTop.ts'
import { AppNav } from '../AppNav'
import { Footer } from '../Footer/Footer.tsx'

export const AppLayout: FC = observer(() => {
  useScrollTop()

  return (
    <>
      <AppNav />
      <Outlet />
      <Footer />
    </>
  )
})
