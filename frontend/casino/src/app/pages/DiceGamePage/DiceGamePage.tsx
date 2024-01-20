import ContainerLayout from "../../utils/ContainerLayout"
import { DicePlayButton } from "../../components/web3/DicePlayButton"
import { useState } from "react";
import { useStores } from "../../hooks/useStores.tsx";
import { observer } from "mobx-react-lite";
import dice1 from '../../../assets/img/dice/dice1.png'
import dice2 from '../../../assets/img/dice/dice2.png'
import dice3 from '../../../assets/img/dice/dice3.png'
import dice4 from '../../../assets/img/dice/dice4.png'
import dice5 from '../../../assets/img/dice/dice5.png'
import dice6 from '../../../assets/img/dice/dice6.png'
import { ChevronUp } from 'lucide-react';


const diceImages = [
    dice1,
    dice2,
    dice3,
    dice4,
    dice5,
    dice6
];

export const DiceGamePage = observer(() => {
    const [selectedDiceValues, setSelectedDiceValues] = useState<number[]>([1, 1]);
    const [isAlertOpen, setIsAlertOpen] = useState(true);

    const [diceValue, setDiceValue] = useState<string | undefined>()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { userStore } = useStores()

    const onSuccess = (result: unknown) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        setDiceValue(result.value)
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        userStore.setBalance(result.balance ?? '0')
        setIsLoading(false)
    }

    const onLoading = () => {
        setIsLoading(true)
    }

    const handleDiceClick = (index: number) => {
        // cycle through values 1 to 6
        const newSelectedDiceValues = [...selectedDiceValues];
        newSelectedDiceValues[index] = (newSelectedDiceValues[index] % 6) + 1;
        setSelectedDiceValues(newSelectedDiceValues);
    };

    const totalSum = selectedDiceValues.reduce((sum, value) => sum + value, 0);

    const handleCloseAlert = () => {
        setIsAlertOpen(false);
    };

    return (
        <ContainerLayout className="min-h-[720px]">
            <div className="flex flex-col items-center text-white">
                <p className="text-2xl sm:text-4xl font-bold uppercase mb-12">
                    брось кубики онлайн!
                </p>
                {isAlertOpen && <div className="flex flex-row bg-slate-800 py-4 px-4 mt-12">
                    <div className="flex flex-col">
                        <span className="text-md sm:text-lg font-bold text-slate-300">
                            Нажми на кубик,
                        </span>
                        <span className="sm:text-md font-bold text-slate-500">
                            чтобы изменить его значение
                        </span>
                    </div>
                    <ChevronUp onClick={handleCloseAlert} />
                </div>}
                <div className="justify-center flex pointer-events-none">
                    <div className="absolute w-full max-w-[710px] h-[456px] bg-lime-800 rounded-[187px] blur-[300px]" />
                </div>
                <div className="flex flex-row w-full max-w-[700px] justify-center gap-12 relative mt-4">
                    {selectedDiceValues.map((value, index) => (
                        <img
                            key={index}
                            src={diceImages[value - 1]}
                            alt={`Dice ${index + 1}`}
                            onClick={() => handleDiceClick(index)}
                            style={{ cursor: 'pointer' }}
                            className="w-[100px] "
                        />
                    ))}
                </div>
                {/* Кнопка для бека */}
                <DicePlayButton onLoading={onLoading} onSuccess={onSuccess} value={selectedDiceValues[0]} secondValue={selectedDiceValues[1]}
                    className="mt-12" />
                <div className="flex flex-col gap-4 sm:flex-row justify-around w-full font-semibold mt-12">
                    <div className="bg-gray-500 rounded-[30px] shadow text-white text-md sm:text-lg font-bold py-2 sm:py-4 px-6 sm:px-12">
                        <p>
                            Выбрано: {selectedDiceValues[0]} и {selectedDiceValues[1]}
                        </p>
                    </div>
                    <div className="bg-gray-500 rounded-[30px] shadow text-white text-md sm:text-lg font-bold py-2 sm:py-4 px-6 sm:px-12">
                        <p>
                            Сумма: {totalSum}
                        </p>
                    </div>
                    {/* {(diceValue && !isLoading) && <div className="bg-gray-800 rounded-[30px] shadow text-white text-md sm:text-lg font-bold py-2 sm:py-4 px-6 sm:px-12">
                        Выпало число: {diceValue}
                    </div>} */}
                    {/* mock */}
                    <div className="bg-gray-800 rounded-[30px] shadow text-white text-md sm:text-lg font-bold py-2 sm:py-4 px-6 sm:px-12">
                        Выпало число: {diceValue}
                    </div>
                </div>
            </div>
        </ContainerLayout>
    )
})