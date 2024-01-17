import ContainerLayout from "../../utils/ContainerLayout"
import PropTypes from 'prop-types';
import Reel from '../../components/App/Slot/Reel';
import { useEffect, useState } from 'react';
import { RPSPlayButton } from '../../components/web3/RPSPlayButton';
import {SlotPlayButton} from "../../components/web3/SlotPlayButton.tsx";

export const SlotGamePage = () => {
    const [isHorizontal, setIsHorizontal] = useState(false)
    const [cellCount, setCellCount] = useState(7)
    const [rng, setRng] = useState(false)
    const [rngReverse, setRngReverse] = useState(false)

    const mql = window.matchMedia('(orientation: portrait)')

    mql.onchange = (e) => {
        if (e.matches) {
            setIsHorizontal(true)
        } else {
            setIsHorizontal(false)
        }
    }

    const handleRng = () => {
        setRng(!rng)
    }
    const handleRngReverse = () => {
        setRngReverse(!rngReverse)
    }

    useEffect(() => {
        if (mql.matches) {
            setIsHorizontal(true)
        } else {
            setIsHorizontal(false)
        }
    }, [])
    return (
        <ContainerLayout>
            <div className="flex flex-row gap-4">
                <div className="max-h-[180px] bg-green-700 flex flex-col justify-between shadow text-white text-2xl font-bold py-4 px-6 rounded-xl">
                    <div className="flex flex-col">
                        <p>выигрыш:</p><span className="text-yellow-400">5000</span>
                    </div>
                    <div className="flex flex-col">
                        <p>ставка:</p><span className="text-yellow-400">10 000</span>
                    </div>
                </div>

                <div className="min-h-[800px] w-full bg-fuchsia-600 flex items-center justify-center">
                    <div className="flex flex-row portrait:flex-col justify-center items-center my-auto">
                        <Reel rng={rng} rngReverse={rngReverse} cellCount={cellCount} isHorizontal={isHorizontal} />
                        <Reel rng={rng} rngReverse={rngReverse} cellCount={cellCount} isHorizontal={isHorizontal} />
                        <Reel rng={rng} rngReverse={rngReverse} cellCount={cellCount} isHorizontal={isHorizontal} />
                    </div>
                </div>

                <div className="max-w-[100px]">
                    <SlotPlayButton />
                </div>
            </div>
        </ContainerLayout>
    );
}

SlotGamePage.propTypes = {
    cellCount: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired
};