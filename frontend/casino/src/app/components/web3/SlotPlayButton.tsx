import PropTypes from "prop-types";
import { useSlotMachine } from "../../web3/functions/SlotMachine/useSlotMachine.ts";
import { Button } from "../ui/button.tsx";

interface SlotPlayButtonProps {
    children: React.ReactNode;
    onClick: () => void;
    disabled: boolean;
}

const SlotPlayButton: React.FC<SlotPlayButtonProps> = ({ children, onClick, disabled }) => {
    const { playSlot } = useSlotMachine();

    const handleClick = () => {
        onClick();
        playSlot();
    };

    return (
        <Button
            className="bg-rose-700 rounded-[100px] shadow text-white font-bold py-5 px-10 hover:bg-rose-600 max-w-[200px] mb-2 lg:mb-4 mt-4 lg:mt-0"
            disabled={disabled}
            onClick={handleClick}
        >
            {children}
        </Button>
    );
};

SlotPlayButton.propTypes = {
    children: PropTypes.node.isRequired,
    onClick: PropTypes.func.isRequired,
};

export default SlotPlayButton;
