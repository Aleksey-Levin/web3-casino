import PropTypes from "prop-types";

interface SlotPlayButtonProps {
    onClick: () => void;
}

const SlotPlayButton: React.FC<SlotPlayButtonProps> = ({ onClick }) => {
    return (
        <button
            className="bg-rose-700 rounded-[100px] shadow text-white text-2xl font-bold py-5 px-10 hover:bg-rose-600 max-w-[200px]"
            onClick={onClick}
        >
            Крутить
        </button>
    );
};

SlotPlayButton.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export default SlotPlayButton;