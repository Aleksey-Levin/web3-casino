import {useConnect} from "../../lib/useConnect.ts";
import WalletIcon from "../../../../components/icons/WalletIcon.tsx";

export const DisconnectButton = () => {
    const { disconnect } = useConnect()
    return (
        <div
            onClick={disconnect}
            className="flex flex-row items-center rounded-[100px] border-[2px] border-[#4F5563] bg-[#3B414F] px-[14px] py-[11px] gap-[3px] cursor-pointer">
            {/* todo: load from .svg file in assets */}
            <WalletIcon/>
            <button>
                Disconnect
            </button>
        </div>
    );
};