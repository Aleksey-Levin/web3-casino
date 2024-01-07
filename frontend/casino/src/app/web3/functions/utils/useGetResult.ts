import {useCallback} from "react";
import axios from "axios";
import useIntervalAsync from "../../../hooks/useIntervalAsync.ts";

const baseUrlToGet = 'https://dora.coz.io/api/v2/neo3/testnet/log/'
export const useGetResult = () => {
    const getResultReq = useCallback(async (tx: string | undefined) => {
        const result = await axios.get(baseUrlToGet + tx)
        console.log(result)
        return result
    }, [])

    const { run: runIsApprovedRefetch } = useIntervalAsync(async (tx) => {
            if (!tx) return
                try {
                    const result = await getResultReq(tx)
                    if (!result) setTimeout(() => {
                        runIsApprovedRefetch(tx)
                    }, 3000)
                    return result
                } catch (e) { setTimeout(() => {
                    runIsApprovedRefetch(tx)
                }, 3000) }
    }, 3000)

    const getResult = useCallback(async (tx: string | undefined) => {
        if (!tx) return
        console.log(tx)
        const result = await runIsApprovedRefetch(tx)
        console.log(result)
    }, [runIsApprovedRefetch])

    return {
        getResult
    }
}