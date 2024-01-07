import {usePlayRoulette} from "../../web3/functions/Roulette/usePlayRoulette.ts";
import {FC, useEffect} from "react";
import {usePlayCraps} from "../../web3/functions/Craps/usePlayCraps.ts";

interface DicePlayButtonProps {
    value: number
    onSuccess: (result: unknown) => void
    onLoading: () => void
    secondValue: number
}

export const DicePlayButton: FC<DicePlayButtonProps> = ({ value, onSuccess, onLoading, secondValue }) => {
    const { playCraps, result, isLoading } = usePlayCraps()

    useEffect(() => {
        if (result) onSuccess(result)
    }, [result])

    useEffect(() => {
        if (isLoading) onLoading()
    }, [isLoading])

    return (
        <button onClick={() => { playCraps(value, secondValue) }} className="bg-rose-700 rounded-[100px] shadow text-white text-2xl font-bold py-5 px-10 hover:bg-rose-600">
            {
                isLoading && 'Loading'
            }
            {
                (!isLoading && !result) && 'Играть'
            }
        </button>
    )
}