import {usePlayRPS} from "../../web3/functions/RPS/usePlayRPS.ts";

export const RPSPlayButton = () => {

    const { playRPS } = usePlayRPS()

    return (
        <button
            onClick={() => { playRPS('rock') }}
            className="bg-rose-700 rounded-[100px] shadow text-white text-2xl font-bold py-5 px-10 hover:bg-rose-600 inline-block max-w-[200px]">
            Играть
        </button >
    )
}