import { useState } from 'react';
import ContainerLayout from "../../utils/ContainerLayout"
import { RPSPlayButton } from "../../components/web3/RPSPlayButton"


export const RockPaperScissorsGamePage = () => {
    const [userChoice, setUserChoice] = useState('src/assets/img/RPS-rock.png');

    const handleImageClick = () => {
        // cycle
        if (userChoice === 'src/assets/img/RPS-rock.png') {
            setUserChoice('src/assets/img/RPS-paper.png');
        } else if (userChoice === 'src/assets/img/RPS-paper.png') {
            setUserChoice('src/assets/img/RPS-scissors.png');
        } else {
            setUserChoice('src/assets/img/RPS-rock.png');
        }
    };

    return (
        <ContainerLayout>

            <div className="grid grid-cols-2">
                <div className="rounded">
                    <p className="text-[46px] font-bold uppercase bg-slate-400 rounded inline-block p-4 m-2">
                        ты
                    </p>
                </div>
                <div className="rounded">
                    <p className="text-[46px] font-bold uppercase bg-slate-400 rounded inline-block p-4 m-2">
                        не ты
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-2">
                <div className="w-[500px] h-[500px]">
                    <img src={userChoice} alt="your_hand" onClick={handleImageClick} />
                </div>
                <div className="w-[500px] h-[500px]">
                    <img src="src/assets/img/RPS-rock.png" alt="casino_hand" />
                </div>
            </div>

            <div className="grid grid-cols-3 items-center">
                <img src="src/assets/img/RPS-rules.png" alt="rules" />
                <div className="max-h-[100px] flex items-center justify-center">
                    <RPSPlayButton />
                </div>
                <div className="bg-green-700 shadow text-white text-2xl font-bold py-4 px-6">
                    <p>won: 5 times</p>
                    <p>lost: 2 times</p>
                </div>
            </div>
        </ContainerLayout>
    )
}