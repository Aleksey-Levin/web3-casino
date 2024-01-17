import {observer} from "mobx-react-lite";
import {useEffect} from "react";
import {useStores} from "../../hooks/useStores.tsx";
import {useFaucet} from "../../web3/functions/Faucet/useFaucet.ts";

export const FaucetButton = observer(() => {
    const { faucet, result } = useFaucet()
    const { userStore } = useStores()
    useEffect(() => {
        if (result) userStore.setBalance(result.balance)
    }, [result])

    return (
        <button onClick={faucet}>
            Get coins
        </button>
    );
});