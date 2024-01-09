import {useCallback} from "react";
import axios from "axios";
import useIntervalAsync from "../../../hooks/useIntervalAsync.ts";
import {useStatusState} from "../../../hooks/useStatusState.ts";

export interface IGetResult {
    tx: string;
    notificationKey?: string
}

const baseUrlToGet = 'https://dora.coz.io/api/v2/neo3/testnet/log/'
export const useGetResult = () => {
    const { statuses, wrapPromise } = useStatusState<{ value: string, balance: string} | undefined, IGetResult>()
    const getResultReq = useCallback(async (tx: string | undefined) => {
        const result = await axios.get(baseUrlToGet + tx)
        console.log(result)
        return result
    }, [])

    const { run: runIsApprovedRefetch } = useIntervalAsync(wrapPromise(async ({tx, notificationKey}) => {
            if (!tx) return
                try {
                    const result = await getResultReq(tx)
                    if (!result) setTimeout(() => {
                        runIsApprovedRefetch(tx)
                    }, 3000)

                    let balance;

                    if (notificationKey === 'balance') {
                        balance = result.data?.stack[0].value
                    } else {
                        balance = result.data?.notifications?.find((item: { event_name: string | undefined; }) => item?.event_name === 'playerBalance')?.state?.value[0].value
                    }
                    const value = result.data?.notifications?.find((item: { event_name: string | undefined; }) => item?.event_name === notificationKey)?.state?.value[0].value

                    return {
                        value,
                        balance
                    }
                } catch (e) { setTimeout(() => {
                    runIsApprovedRefetch(tx, notificationKey)
                }, 3000) }
    }), 3000)

    const getResult = useCallback(async (tx: string | undefined, notificationKey?: string) => {
        if (!tx) return
        console.log(tx)
        const result = await runIsApprovedRefetch(tx, notificationKey)
        console.log(result)
    }, [runIsApprovedRefetch])

    return {
        getResult,
        ...statuses
    }
}