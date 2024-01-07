import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback} from "react";
import {useGetResult} from "../utils/useGetResult.ts";
import {config} from "../config/config.ts";

export const usePlayRoulette = () => {
    const wcSdk = useWalletConnect()
    const { getResult, ...statuses } = useGetResult()

    const playRoulette = useCallback(async (value: number) => {
        // const resp = await wcSdk.invokeFunction({
        //     invocations: [{
        //         scriptHash: '270c825a5ac041e18be45074bbb942255164a214',
        //         operation: 'balanceOf',
        //         args: [
        //             { type: 'Hash160', value: 'NQCLAHuu4umnR99KB5m7U8ppJFtWqhw6DS' },
        //         ]
        //     }],
        //     signers: [{
        //         scopes: 'Global',
        //     }]
        // })
        console.log(config.roulette.contractAddress)
        const resp = await wcSdk.invokeFunction({
            invocations: [{
                scriptHash: config.roulette.contractAddress,
                operation: 'playRoulette',
                args: [
                    { type: 'Integer', value: '40' },
                    { type: 'Integer', value: value.toString() },
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
        playRoulette,
        ...statuses
    }
}