import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback} from "react";
import {useGetResult} from "../utils/useGetResult.ts";
import {config} from "../config/config.ts";

export const usePlayCraps = () => {
    const wcSdk = useWalletConnect()
    const { getResult, ...statuses } = useGetResult()

    const playCraps = useCallback(async (value: number, secondValue: number) => {
        console.log(config.craps.contractAddress)
        const resp = await wcSdk.invokeFunction({
            invocations: [{
                scriptHash: config.craps.contractAddress,
                operation: 'playCraps',
                args: [
                    { type: 'Integer', value: '40' },
                    { type: 'Integer', value: value.toString() },
                    { type: 'Integer', value: secondValue.toString() },
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
        playCraps,
        ...statuses
    }
}