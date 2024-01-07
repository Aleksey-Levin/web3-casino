import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback, useEffect, useState} from "react";

export const useConnect = () => {
    const wcSdk = useWalletConnect()
    const [isConnected, setIsConnected] = useState<boolean>(false)

    const checkIsConnected = useCallback(() => {
        const isConnectedResult = wcSdk.isConnected()
        setIsConnected(isConnectedResult)
    }, [wcSdk])

    const connect = useCallback(async () => {
        await wcSdk.connect('neo3:testnet', ['invokeFunction', 'testInvoke', 'signMessage','verifyMessage'])

        checkIsConnected()
    }, [wcSdk, checkIsConnected])

    const disconnect = useCallback(async () => {
        if (!wcSdk.isConnected()) {
            setIsConnected(false)
        }

        await wcSdk.disconnect()

        checkIsConnected()
    }, [wcSdk, checkIsConnected, setIsConnected])

    useEffect(() => {
        checkIsConnected()
        console.log(isConnected)
    }, [wcSdk, checkIsConnected])

    return {
        connect,
        disconnect,
        isConnected
    }
}