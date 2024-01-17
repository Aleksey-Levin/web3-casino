import { useEffect, useState } from "react";
import ContainerLayout from "../../utils/ContainerLayout.tsx";
import Reel from "../../components/App/Slot/Reel.tsx";
import SlotPlayButton from "../../components/web3/SlotPlayButton.tsx";

export const SlotGamePage = () => {
    const [isHorizontal, setIsHorizontal] = useState(false);
    const [rng, setRng] = useState(false);
    const [rngReverse, setRngReverse] = useState(false);

    const mql = window.matchMedia("(orientation: portrait)");

    mql.onchange = (e) => {
        if (e.matches) {
            setIsHorizontal(true);
        } else {
            setIsHorizontal(false);
        }
    };

    const spinReels = () => {
        // Trigger the spinning effect in each reel
        setRng(!rng);
        setRngReverse(!rngReverse);
    };

    useEffect(() => {
        if (mql.matches) {
            setIsHorizontal(true);
        } else {
            setIsHorizontal(false);
        }
    }, []);

    return (
        <ContainerLayout>
            <div className="flex flex-row gap-4">
                <div className="max-h-[180px] bg-green-700 flex flex-col justify-between shadow text-white text-2xl font-bold py-4 px-6 rounded-xl">
                    <div className="flex flex-col">
                        <p>выигрыш:</p>
                        <span className="text-yellow-400">5000</span>
                    </div>
                    <div className="flex flex-col">
                        <p>ставка:</p>
                        <span className="text-yellow-400">10 000</span>
                    </div>
                </div>

                <div className="min-h-[800px] w-full flex items-center justify-center">
                    <div className="flex flex-row portrait:flex-col justify-center items-center my-auto">
                        <Reel rng={rng} rngReverse={rngReverse} cellCount={7} isHorizontal={isHorizontal} />
                        <Reel rng={rng} rngReverse={rngReverse} cellCount={7} isHorizontal={isHorizontal} />
                        <Reel rng={rng} rngReverse={rngReverse} cellCount={7} isHorizontal={isHorizontal} />
                    </div>
                </div>

                <div className="max-w-[100px]">
                    <SlotPlayButton onClick={spinReels} />
                </div>
            </div>
        </ContainerLayout>
    );
};