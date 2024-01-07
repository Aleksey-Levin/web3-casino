import {usePlayRoulette} from "../../web3/functions/Roulette/usePlayRoulette.ts";
import {FC, useEffect} from "react";

interface DicePlayButtonProps {
    value: number
    onSuccess: (result: unknown) => void
    onLoading: () => void
}

export const DicePlayButton: FC<DicePlayButtonProps> = ({ value, onSuccess, onLoading }) => {
    const { playRoulette, result, isLoading } = usePlayRoulette()

    useEffect(() => {
        if (result) onSuccess(result)
    }, [result])

    useEffect(() => {
        if (isLoading) onLoading()
    }, [isLoading])

    return (
        <button onClick={() => { playRoulette(value) }} className="bg-rose-700 rounded-[100px] shadow text-white text-2xl font-bold py-5 px-10 hover:bg-rose-600">
            {
                isLoading && 'Loading'
            }
            {
                (!isLoading && !result) && 'Играть'
            }
        </button>
    )
}