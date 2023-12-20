import ContainerLayout from "../../utils/ContainerLayout"
import { DicePlayButton } from "../../components/web3/DicePlayButton"

export const DiceGamePage = () => {
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
                    <img src="src/assets/img/dice-img.png" alt="Dice" />
                    <img src="src/assets/img/dice-img.png" alt="Dice" />
                </div>
                {/* Кнопка для бека */}
                <DicePlayButton />
                <div className="flex flex-row justify-around w-full font-semibold">
                    <div className="bg-gray-500 rounded-[30px] py-5 px-10 text-2xl">
                        Вы загадали: 5
                    </div>
                    <div className="bg-gray-800 rounded-[30px] py-5 px-10 text-2xl">
                        Выпало число: 5
                    </div>
                </div>
            </div>
        </ContainerLayout>
    )
}