import CoinIcon from "../../icons/CoinIcon";
import { ConnectStateButton } from "../../../web3/connect";
import chipImg from '../../../../assets/icons/chip.png'
import { useStores } from "../../../hooks/useStores.tsx";
import { observer } from "mobx-react-lite";
import { CheckBalanceButton } from "../../../web3/balance/CheckBalanceButton.tsx";
import { FaucetButton } from "../../web3/FaucetButton.tsx";
import { DropdownMenu } from "../../ui/dropdown-menu.tsx";
import { DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "../../ui/button.tsx";

export const AppNav = observer(() => {
    const { userStore } = useStores()
    return (
        <div style={{ height: 'max-content' }} className="bg-[#30333C] text-white py-2 z-50 sticky top-0">
            <div className="container mx-auto">
                <div className="flex flex-row justify-between">
                    <a href="/" className="flex flex-row items-center">
                        <img src={chipImg} alt="Icon" className="w-[53px] h-[53px] mr-[15px]" />
                        <span className="font-semibold text-3xl">
                            <span className="bg-gradient-to-b from-white via-blue-400 to-red-400 bg-clip-text text-transparent">Z</span>aSlot
                            <span className="text-gray-400">.bet</span>
                        </span>
                    </a>
                    <div className="flex-row gap-8 hidden sm:flex">
                        <div className="rounded-[100px] bg-[#2D313D] flex flex-row items-center justify-between shadow-inset">
                            <div className="flex flex-row gap-[3px] items-center px-[15px] py-[11px]">
                                <CoinIcon />
                                {userStore.balance ? <span> {
                                    parseFloat(userStore.balance) > 5 ? userStore.balance : <FaucetButton />
                                }</span> : <CheckBalanceButton />}
                            </div>
                            <ConnectStateButton />
                        </div>
                    </div>
                    <div className="block sm:hidden my-auto">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button className="bg-[#2D313D] text-white" variant="outline">Menu</Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="bg-[#2D313D] mt-[25px] mr-[20px] p-4 rounded">
                                <DropdownMenuItem>
                                    <div className="flex flex-row gap-[3px] items-center px-[15px] py-[11px]">
                                        <CoinIcon />
                                        {userStore.balance ? <span> {
                                            parseFloat(userStore.balance) > 5 ? userStore.balance : <FaucetButton />
                                        }</span> : <CheckBalanceButton />}
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuItem><ConnectStateButton /></DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                </div>
            </div>
        </div>
    )
})
