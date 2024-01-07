import {useConnect} from "../../lib/useConnect.ts";

export const ConnectButton = () => {
    const { connect } = useConnect()
    return (
        <button onClick={connect}>
            Connect
        </button>
    );
};