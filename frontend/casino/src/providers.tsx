import { observer } from 'mobx-react-lite'
import { type FC, type PropsWithChildren } from 'react'
import { StitchesProvider } from './styles'
import {WalletConnectProvider} from "@cityofzion/wallet-connect-sdk-react";
import {wcOptions} from "./app/web3/connect/lib/config.ts";

export const Providers: FC<PropsWithChildren> = observer(({ children }) => {
  return (
      <WalletConnectProvider autoManageSession={true} options={wcOptions}>
          <StitchesProvider>
              {children}
          </StitchesProvider>
      </WalletConnectProvider>

  )
})
