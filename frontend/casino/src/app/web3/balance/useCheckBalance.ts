import {useWalletConnect} from "@cityofzion/wallet-connect-sdk-react";
import {useCallback} from "react";
import {useGetResult} from "../functions/utils/useGetResult.ts";
import {config} from "../functions/config/config.ts";

export const useCheckBalance = () => {
    const wcSdk = useWalletConnect()
    const { getResult, ...statuses } = useGetResult()

    const checkBalance = useCallback(async () => {
        console.log(config.zaCoin.contractAddress)
        const address = wcSdk.getAccountAddress()

        if (!address) return

        const resp = await wcSdk.invokeFunction({
            invocations: [{
                scriptHash: config.zaCoin.contractAddress,
                operation: 'balanceOf',
                args: [
                    { type: 'Hash160', value: address },
                ]
            }],
            signers: [{
                scopes: 'Global',
            }]
        })
        console.log(resp)
        await getResult(resp, 'balance')
    }, [wcSdk, getResult])

    return {
        checkBalance,
        ...statuses
    }
}