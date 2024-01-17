import {useSlotMachine} from "../../web3/functions/SlotMachine/useSlotMachine.ts";

export const SlotPlayButton = () => {

    const { playSlot } = useSlotMachine()

    return (
        <button
            onClick={() => { playSlot() }}
            className="bg-rose-700 rounded-[100px] shadow text-white text-2xl font-bold py-5 px-10 hover:bg-rose-600">
            Крутить
        </button>
    )
}