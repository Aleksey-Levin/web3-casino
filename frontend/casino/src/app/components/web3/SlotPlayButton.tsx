import PropTypes from "prop-types";
import {useSlotMachine} from "../../web3/functions/SlotMachine/useSlotMachine.ts";

interface SlotPlayButtonProps {
    onClick: () => void;
}

const SlotPlayButton: React.FC<SlotPlayButtonProps> = ({ onClick }) => {

    const { playSlot } = useSlotMachine()

    return (
        <button
            className="bg-rose-700 rounded-[100px] shadow text-white text-2xl font-bold py-5 px-10 hover:bg-rose-600 max-w-[200px]"
            onClick={() => {
                onClick()
                playSlot()
            }}
        >
            Крутить
        </button>
    );
};

SlotPlayButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SlotPlayButton;