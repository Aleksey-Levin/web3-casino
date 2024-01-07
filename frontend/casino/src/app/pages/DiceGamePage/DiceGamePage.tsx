import ContainerLayout from "../../utils/ContainerLayout"
import { DicePlayButton } from "../../components/web3/DicePlayButton"
import diceImg from '../../../assets/img/dice-img.png'
import {useState} from "react";
import {useStores} from "../../hooks/useStores.tsx";
import {observer} from "mobx-react-lite";

export const DiceGamePage = observer(() => {
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

    return (
        <ContainerLayout>
            <div className="flex flex-col items-center text-white">
                <p className="text-[46px] font-bold uppercase">
                    брось кубики онлайн!
                </p>
                <div className="justify-center flex pointer-events-none">
                    <div className="absolute w-[710px] h-[456px] bg-lime-800 rounded-[187px] blur-[300px]" />
                </div>
                <div className="flex flex-row min-w-full justify-center gap-10 relative mt-12">
                    <img src={diceImg} alt="Dice" />
                    <img src={diceImg} alt="Dice" />
                </div>
                {/* Кнопка для бека */}
                <DicePlayButton onLoading={onLoading} onSuccess={onSuccess} value={5}/>
                <div className="flex flex-row justify-around w-full font-semibold">
                    <div className="bg-gray-500 rounded-[30px] py-5 px-10 text-2xl">
                        Вы загадали: 5
                    </div>
                    {(diceValue && !isLoading) && <div className="bg-gray-800 rounded-[30px] py-5 px-10 text-2xl">
                        Выпало число: {diceValue}
                    </div>}
                </div>
            </div>
        </ContainerLayout>
    )
})