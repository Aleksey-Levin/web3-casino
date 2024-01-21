import { FC } from "react";
import { usePlayRPS } from "../../web3/functions/RPS/usePlayRPS.ts";

interface RPSPlayButtonProps {
    className?: string
}

export const RPSPlayButton: FC<RPSPlayButtonProps> = ({ className }) => {

    const { playRPS } = usePlayRPS()

    return (
        <button
            onClick={() => { playRPS('1') }}
            className={`bg-rose-700 rounded-[100px] shadow text-white text-md sm:text-lg font-bold py-2 sm:py-4 px-6 sm:px-12 hover:bg-rose-600 ${className}`}>
            Играть
        </button >
    )
}