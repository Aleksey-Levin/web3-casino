import React from 'react';

import useSlotMachine from '../../../hooks/useSlotMachine';
import Wheel from './Wheel';
import Message from './Message';
import { Button } from '../../ui/button';
import SlotPlayButton from '../../web3/SlotPlayButton';

const SlotMachine: React.FC = () => {
    const { wheels, startSpinningHandler, stopSpinningHandler } = useSlotMachine();

    return (
        <div className="flex flex-col min-h-[100dvh]">

            <div className="flex flex-row items-center justify-center">
                {wheels.indexes
                    && wheels.indexes.length
                    && wheels.indexes.map((randomIndex, currIndex) =>
                        <Wheel key={currIndex} randomIndex={randomIndex} />)
                }
            </div>

            <div className="flex flex-col items-center">
                <SlotPlayButton disabled={wheels.status === 'spinning'} onClick={startSpinningHandler} >Start Spinning</SlotPlayButton>
                {/* A mock button until we connect to an actual backend ;) */}
                <Button
                    disabled={wheels.status !== 'spinning'}
                    onClick={stopSpinningHandler}
                >Stop it!</Button>
            </div>

            {wheels.status === 'spun' && (
                <Message score={wheels.score} />
            )}
        </div>
    );
};

export default SlotMachine;