import ContainerLayout from "../../utils/ContainerLayout";
import GamepadIcon from "../../components/icons/GamepadIcon";
import { Link } from "react-router-dom";
import casinoBg from '../../../assets/img/casino-bg-image.png'
import diceSmall from '../../../assets/img/dices-small.png'
import rpsSmall from '../../../assets/img/rps-small.png'
import slotMachine from '../../../assets/img/slot-machine-small.png'

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../../components/ui/carousel"
import {
    Card,
    CardContent,
    CardTitle
} from "../../components/ui/card";
import { Button, buttonVariants } from "../../components/ui/button";


interface Game {
    title: string;
    img: string;
    link: string;
}

const games: Game[] = [
    {
        title: 'Dice',
        img: diceSmall,
        link: '/dice',
    },
    {
        title: 'RPS',
        img: rpsSmall,
        link: '/rock-paper-scissors',
    },
    {
        title: 'Slots',
        img: slotMachine,
        link: '/slot',
    },
];


export const MainPage = () => {
    return (
        <ContainerLayout>
            <div className="absolute max-w-[1235px] h-[629px] overflow-hidden">
                <img
                    src={casinoBg}
                    alt="Icon"
                    className="w-full h-full object-cover filter brightness-80 blur-[4px]"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-[#171A21] via-[rgba(22, 25, 32, 0.10)] to-[#171A21] via-[rgba(22,22,22,0)]" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-[rgba(22, 25, 32, 0.10)] to-[#171A21] via-[rgba(22,22,22,0)]" />
            </div>


            <div className="w-full h-max-content bg-gray-800 rounded-[25px] p-[30px] text-white flex flex-col gap-[30px] relative z-10 mt-[400px]">
                <div className="flex flex-row justify-between">
                    <div className="flex flex-row items-center gap-2">
                        <GamepadIcon />
                        <span className="font-bold">
                            Games
                        </span>
                    </div>
                </div>

                <Carousel className="w-full">
                    <CarouselContent className="-ml-1 px-[32px]">
                        {games.map((game, index) => (
                            <CarouselItem key={index} className="pl-1 lg:basis-1/3 sm:basis-1/2">
                                <div className="pl-1 h-full">
                                    <Card className="bg-[#323846] border-2 border-gray-700 min-h-full items-center">
                                        <CardContent className="flex items-center justify-between p-2 gap-2">
                                            <div className="rounded-full bg-neutral-800 inline-block">
                                                <img
                                                    src={game.img}
                                                    alt="Icon"
                                                    className="object-cover"
                                                />
                                            </div>
                                            <CardTitle className="text-white tracking-tight">{game.title}</CardTitle>
                                            <Button asChild>
                                                <Link to={game.link}>Play</Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="translate-x-[32px] bg-gray-600 active:bg-gray-500" />
                    <CarouselNext className="-translate-x-[32px] bg-gray-600 active:bg-gray-500" />
                </Carousel>

            </div>
        </ContainerLayout>
    );
};