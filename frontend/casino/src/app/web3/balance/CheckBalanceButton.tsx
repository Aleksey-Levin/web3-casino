import {useCheckBalance} from "./useCheckBalance.ts";
import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {useStores} from "../../hooks/useStores.tsx";

export const CheckBalanceButton = observer(() => {
    const { checkBalance, result } = useCheckBalance()
    const { userStore } = useStores()
    useEffect(() => {
        if (result) userStore.setBalance(result.balance)
    }, [result])

    return (
        <button onClick={checkBalance}>
            Check balance
        </button>
    );
});