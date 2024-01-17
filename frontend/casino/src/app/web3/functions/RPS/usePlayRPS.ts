import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback} from "react";
import {useGetResult} from "../utils/useGetResult.ts";
import {config} from "../config/config.ts";

export const usePlayRPS = () => {
    const wcSdk = useWalletConnect()
    const { getResult, ...statuses } = useGetResult()

    const playRPS = useCallback(async (value: string) => {
        console.log(config.rps.contractAddress)
        const resp = await wcSdk.invokeFunction({
            invocations: [{
                scriptHash: config.rps.contractAddress,
                operation: 'playRPS',
                args: [
                    { type: 'Integer', value: value },
                    { type: 'Integer', value: '4' },
                ]
            }],
            signers: [{
                scopes: 'Global',
            }]
        })
        console.log(resp)
        await getResult(resp, 'rouletteNumber')
    }, [wcSdk, getResult])

    return {
        playRPS,
        ...statuses
    }
}