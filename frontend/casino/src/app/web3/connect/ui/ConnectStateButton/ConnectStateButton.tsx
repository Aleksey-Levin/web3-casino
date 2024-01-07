import {useConnect} from "../../lib/useConnect.ts";
import {DisconnectButton} from "../DisconnectButton/DisconnectButton.tsx";
import {ConnectButton} from "../ConnectButton/ConnectButton.tsx";

export const ConnectStateButton = () => {
    const { isConnected } = useConnect()
    if (isConnected) return <DisconnectButton/>

    return <ConnectButton/>
};