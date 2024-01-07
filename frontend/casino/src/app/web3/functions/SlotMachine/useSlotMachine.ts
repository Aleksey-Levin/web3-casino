import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback} from "react";
import {useGetResult} from "../utils/useGetResult.ts";
import {useStatusState} from "../../../hooks/useStatusState.ts";
import {config} from "../config/config.ts";

export const useSlotMachine = () => {
    const wcSdk = useWalletConnect()
    const { getResult } = useGetResult()
    const { statuses, wrapPromise } = useStatusState()

    const playSlotMachine = useCallback(wrapPromise(async () => {
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
        const resp = await wcSdk.invokeFunction({
            invocations: [{
                scriptHash: config.slotMachine.contractAddress,
                operation: 'playRoulette',
                args: [
                    { type: 'Integer', value: '40' },
                    { type: 'Integer', value: '3' },
                ]
            }],
            signers: [{
                scopes: 'Global',
            }]
        })
        console.log(resp)
        const result = await getResult(resp)
        console.log(result)
    }), [wcSdk, getResult, wrapPromise])

    return {
        playSlotMachine,
        ...statuses
    }
}