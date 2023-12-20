import CoinIcon from "../../utils/CoinIcon";
import GamepadIcon from "../../utils/GamepadIcon";

export const MainPage = () => {
    return (
        <div className="flex bg-[#171A21]">
            <div className="container mx-auto relative">
                <div className="absolute w-[1235px] h-[629px] overflow-hidden">
                    <img
                        src="src/assets/img/casino-bg-image.png"
                        alt="Icon"
                        className="w-full h-full object-cover filter brightness-80 blur-[4px]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#171A21] via-[rgba(22, 25, 32, 0.10)] to-[#171A21] via-[rgba(22,22,22,0)]" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#171A21] via-[rgba(22, 25, 32, 0.10)] to-[#171A21] via-[rgba(22,22,22,0)]" />
                </div>
                <div className="text-white text-[46px] font-bold mb-[300px] relative z-10 mt-[100px]">
                    <span>
                        GET UP TO </span>
                    <span className="text-amber-400">$1500</span>
                    <span> BONUS
                    </span>
                    <div className="text-gray-400 text-[25px] font-bold">REGISTER AND GET YOUR BONUS</div>
                </div>
                <div className="w-full h-max-content bg-gray-800 rounded-[25px] p-[30px] text-white flex flex-col gap-[30px] relative z-10">
                    <div className="flex flex-row justify-between">
                        <div className="flex flex-row items-center gap-2">
                            <GamepadIcon />
                            <span className="font-bold">
                                In-House games
                            </span>
                        </div>
                        <div className="flex flex-row gap-2 items-center">
                            <div className="w-max-content h-max-content bg-gray-700 rounded-md px-[10px] cursor-pointer">
                                <span className="font-bold">&#10094;</span>
                            </div>
                            <div className="w-max-content h-max-content bg-gray-700 rounded-md px-[10px] cursor-pointer">
                                <span className="font-bold">&#10095;</span>
                            </div>
                            <div className="w-max-content h-max-content bg-gray-700 rounded-md px-[10px] cursor-pointer">
                                <span className="font-bold">See all</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-row justify-evenly">
                        {/* dices */}
                        <div className="w-[374px] h-[187.35px] bg-[#323846] rounded-[23px] border-2 border-gray-700 flex flex-row items-center justify-between px-4 py-6 gap-3">
                            <div className="rounded-full bg-neutral-800 inline-block">
                                <img
                                    src="src/assets/img/dices-small.png"
                                    alt="Icon"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex flex-row justify-between min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold">DICE</span>
                                        <div className="text-gray-400 font-medium">562 online</div>
                                    </div>
                                    <button className=" min-w-[100px] max-h-[45px] bg-blue-500 rounded-[10px] border border-blue-400 font-bold px-3">Play now</button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Hourly drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">217.32</span>
                                            <CoinIcon />
                                        </div>
                                    </div>
                                    <div className="w-[2px] bg-slate-400"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Daily drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">217.32</span>
                                            <CoinIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {/* Rock paper scissorstel */}
                        <div className="w-[404px] h-[187.35px] bg-[#323846] rounded-[23px] border-2 border-gray-700 flex flex-row items-center justify-between px-4 py-6 gap-3">
                            <div className="rounded-full w-[140px] bg-neutral-800 inline-block">
                                <img
                                    src="src/assets/img/rps-small.png"
                                    alt="Icon"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex flex-row justify-between min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold uppercase">Rock paper scissors</span>
                                        <div className="text-gray-400 font-medium">689 online</div>
                                    </div>
                                    <button className="bg-blue-500 min-w-[103px] max-h-[45px] rounded-[10px] border border-blue-400 font-bold px-3 inline-block">Play now</button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Hourly drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">367.27</span>
                                            <CoinIcon />
                                        </div>
                                    </div>
                                    <div className="w-[2px] bg-slate-400"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Daily drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">1,984.18</span>
                                            <CoinIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-[374px] h-[187.35px] bg-[#323846] rounded-[23px] border-2 border-gray-700 flex flex-row items-center justify-between px-4 py-6 gap-3">
                            <div className="rounded-full bg-neutral-800 inline-block">
                                <img
                                    src="src/assets/img/slot-machine-small.png"
                                    alt="Icon"
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex flex-col h-full justify-between">
                                <div className="flex flex-row justify-between min-w-[200px]">
                                    <div className="flex flex-col">
                                        <span className="text-xl font-bold uppercase">Slot machine</span>
                                        <div className="text-gray-400 font-medium">315 online</div>
                                    </div>
                                    <button className="bg-blue-500 min-w-[103px] max-h-[45px] rounded-[10px] border border-blue-400 font-bold px-3 inline-block">Play now</button>
                                </div>
                                <div className="flex flex-row justify-between">
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Hourly drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">198.47</span>
                                            <CoinIcon />
                                        </div>
                                    </div>
                                    <div className="w-[2px] bg-slate-400"></div>
                                    <div className="flex flex-col">
                                        <span className="text-gray-400 font-medium text-[14px]">
                                            Daily drop
                                        </span>
                                        <div className="flex flex-row gap-2">
                                            <span className="font-medium">1,487.28</span>
                                            <CoinIcon />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};