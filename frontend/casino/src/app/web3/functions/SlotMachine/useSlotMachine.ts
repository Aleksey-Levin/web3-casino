import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback} from "react";
import {useGetResult} from "../utils/useGetResult.ts";
import {config} from "../config/config.ts";

export const useSlotMachine = () => {
    const wcSdk = useWalletConnect()
    const { getResult, ...statuses } = useGetResult()

    const playSlot = useCallback(async () => {
        console.log(config.slotMachine.contractAddress)
        const resp = await wcSdk.invokeFunction({
            invocations: [{
                scriptHash: config.slotMachine.contractAddress,
                operation: 'rollSlot',
                args: [
                    { type: 'Integer', value: '40' },
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
        playSlot,
        ...statuses
    }
}