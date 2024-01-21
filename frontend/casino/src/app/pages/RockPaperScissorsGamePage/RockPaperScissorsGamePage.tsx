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
        <ContainerLayout className='min-h-[780px]'>
            <div className="grid grid-cols-2">
                <div className="rounded">
                    <p className="text-lg sm:text-2xl font-bold uppercase bg-slate-400 rounded inline-block p-2 sm:p-4 m-2">
                        ты
                    </p>
                    <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]">
                        <img src={userChoice} alt="your_hand" onClick={handleImageClick} />
                    </div>
                </div>
                <div className="rounded">
                    <p className="text-lg sm:text-2xl font-bold uppercase bg-slate-400 rounded inline-block p-2 sm:p-4 m-2">
                        противник
                    </p>
                    <div className="w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]">
                        <img src="src/assets/img/RPS-rock.png" alt="casino_hand" />
                    </div>
                </div>
            </div>
            <div className="flex flex-col-reverse items-center sm:grid sm:grid-cols-3">
                <img src="src/assets/img/RPS-rules.png" alt="rules" className='mt-[70px] sm:mt-0' />
                <RPSPlayButton className='mt-12 sm:mt-0' />
            </div>
        </ContainerLayout>
    )
}