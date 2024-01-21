import { FC, useEffect } from "react";
import { usePlayCraps } from "../../web3/functions/Craps/usePlayCraps.ts";

interface DicePlayButtonProps {
    value: number
    onSuccess: (result: unknown) => void
    onLoading: () => void
    secondValue: number
    className?: string
}

export const DicePlayButton: FC<DicePlayButtonProps> = ({ value, onSuccess, onLoading, secondValue, className }) => {
    const { playCraps, result, isLoading } = usePlayCraps()

    useEffect(() => {
        if (result) onSuccess(result)
    }, [result])

    useEffect(() => {
        if (isLoading) onLoading()
    }, [isLoading])

    return (
        <button onClick={() => { playCraps(value, secondValue) }}
            className={`bg-rose-700 rounded-[100px] shadow text-white text-md sm:text-lg font-bold py-2 sm:py-4 px-6 sm:px-12 hover:bg-rose-600 ${className}`}>
            {
                isLoading && 'Loading'
            }
            {
                (!isLoading && !result) && 'Играть'
            }
        </button>
    )
}