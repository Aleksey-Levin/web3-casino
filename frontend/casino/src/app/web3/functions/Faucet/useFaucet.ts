import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback} from "react";
import {useGetResult} from "../utils/useGetResult.ts";
import {config} from "../config/config.ts";

export const useFaucet = () => {
    const wcSdk = useWalletConnect()
    const { getResult, ...statuses } = useGetResult()

    const faucet = useCallback(async () => {
        console.log(config.zaFaucet.contractAddress)
        const resp = await wcSdk.invokeFunction({
            invocations: [{
                scriptHash: config.zaFaucet.contractAddress,
                operation: 'getZaCoin',
                args: []
            }],
            signers: [{
                scopes: 'Global',
            }]
        })
        console.log(resp)
        await getResult(resp, 'rouletteNumber')
    }, [wcSdk, getResult])

    return {
        faucet,
        ...statuses
    }
}