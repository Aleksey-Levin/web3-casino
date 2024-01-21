import React from 'react';

import Strawberry from '../../../../assets/img/SlotMachine/Straberry.svg';
import Orange from '../../../../assets/img/SlotMachine/Orange.svg';
import Banana from '../../../../assets/img/SlotMachine/Banana.svg';
import Monkey from '../../../../assets/img/SlotMachine/Monkey.svg';

type WheelProps = {
    randomIndex: number;
};

const Wheel: React.FC<WheelProps> = ({ randomIndex }: WheelProps) => (
    <div className="relative flex-shrink-0 w-16 h-16 sm:w-32 sm:h-32 rounded-full m-2 sm:m-4 bg-[#e5cabe] flex items-center justify-center leading-0 md:m-8">
        <img
            src={Strawberry}
            className={`absolute top-0 sm:top-6 right-0 sm:right-6 bottom-0 sm:bottom-6 left-0 sm:left-6 opacity-0 transition-opacity duration-100 ease-in-out ${randomIndex === 0 ? 'opacity-100' : ''
                }`}
            alt="Strawberry"
        />
        <img
            src={Orange}
            className={`absolute top-0 sm:top-6 right-0 sm:right-6 bottom-0 sm:bottom-6 left-0 sm:left-6 opacity-0 transition-opacity duration-100 ease-in-out ${randomIndex === 1 ? 'opacity-100' : ''
                }`}
            alt="Orange"
        />
        <img
            src={Banana}
            className={`absolute top-0 sm:top-6 right-0 sm:right-6 bottom-0 sm:bottom-6 left-0 sm:left-6 opacity-0 transition-opacity duration-100 ease-in-out ${randomIndex === 2 ? 'opacity-100' : ''
                }`}
            alt="Banana"
        />
        <img
            src={Monkey}
            className={`absolute top-0 sm:top-6 right-0 sm:right-6 bottom-0 sm:bottom-6 left-0 sm:left-6 opacity-0 transition-opacity duration-100 ease-in-out ${randomIndex === 3 ? 'opacity-100' : ''
                }`}
            alt="Monkey"
        />
    </div>
);


export default Wheel;