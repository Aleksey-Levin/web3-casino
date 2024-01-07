import {usePlayCraps} from "../../web3/functions/Craps/usePlayCraps.ts";

export const MainPage = () => {
    const { invoke } = usePlayCraps()
    return (
        <h1 className="text-3xl font-bold underline">
            <button onClick={invoke}>
                Game
            </button>
        </h1>
    );
};