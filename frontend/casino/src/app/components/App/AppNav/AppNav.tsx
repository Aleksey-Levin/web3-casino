import CoinIcon from "../../icons/CoinIcon";
import ProfileIcon from "../../icons/ProfileIcon";
import WalletIcon from "../../icons/WalletIcon";

export const AppNav = () => {
    return (
        <div style={{ height: 'max-content' }} className="bg-[#30333C] text-white py-2 z-50 sticky top-0">
            <div className="container mx-auto">
                <div className="flex flex-row justify-between">
                    <a href="/" className="flex flex-row items-center">
                        <img src="src/assets/icons/chip.png" alt="Icon" className="w-[53px] h-[53px] mr-[15px]" />
                        <span className="font-semibold text-3xl">
                            <span className="bg-gradient-to-b from-white via-blue-400 to-red-400 bg-clip-text text-transparent">Z</span>aSlot
                            <span className="text-gray-400">.bet</span>
                        </span>
                    </a>
                    <div className="flex flex-row gap-8">
                        <div className="rounded-[100px] bg-[#2D313D] flex flex-row items-center justify-between shadow-inset">
                            <div className="flex flex-row gap-[3px] items-center px-[15px] py-[11px]">
                                <CoinIcon />
                                {/* placeholder for balance */}
                                <span>0.000000</span>
                            </div>
                            <div className="flex flex-row items-center rounded-[100px] border-[2px] border-[#4F5563] bg-[#3B414F] px-[14px] py-[11px] gap-[3px] cursor-pointer">
                                {/* todo: load from .svg file in assets */}
                                <WalletIcon />
                                <button>
                                    Wallet
                                </button>
                            </div>
                        </div>
                        <div className="flex flex-row items-center">
                            <span>Robin F.</span>
                            <ProfileIcon />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};