import ContainerLayout from "../../utils/ContainerLayout"

export const DiceGamePage = () => {
    return (
        <ContainerLayout>
            <p className="text-white text-[46px] font-bold uppercase">
                брось кубики онлайн!
            </p>
            <div className="justify-center flex">
                <div className="absolute w-[710px] h-[456px] bg-lime-800 rounded-[187px] blur-[300px]" />
            </div>
            <div className="flex flex-row min-w-full justify-center gap-10 relative mt-12">
                <img src="src/assets/img/dice-img.png" alt="Dice" />
                <img src="src/assets/img/dice-img.png" alt="Dice" />
            </div>
        </ContainerLayout>
    )
}