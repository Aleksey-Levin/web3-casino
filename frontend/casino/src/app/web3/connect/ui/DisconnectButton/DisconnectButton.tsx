import {useConnect} from "../../lib/useConnect.ts";

export const DisconnectButton = () => {
    const { disconnect } = useConnect()
    return (
        <button onClick={disconnect}>
            Disconnect
        </button>
    );
};