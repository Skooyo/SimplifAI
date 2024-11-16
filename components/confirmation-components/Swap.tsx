import Image from "next/image";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

type SwapCardProps = {
    tokenSwapFrom: string;
    tokenSwapTo: string;
    tokenSwapFromAmount: number;
}

const SwapCard = ({tokenSwapFrom, tokenSwapTo, tokenSwapFromAmount} : SwapCardProps) => {
    return (
        
        <div className="flex flex-col justify-center items-center w-full h-full p-6 font-semibold backdrop-blur-sm card-gradient rounded-xl drop-shadow-lg hover:drop-shadow-2xl text-[#9d9d9d]">
            <div>
                <h1 className="text-3xl font-bold mb-3 text-white">Swap</h1>
            </div>
            <div className="flex flex-col sm:flex-row w-full justify-center items-center">
                {/** Logos */}
                <div className="flex w-2/3 justify-around items-center m-4 sm:m-0">
                    <div className="w-1/3 h-full ">
                        <Image src="https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png" alt="" width={100} height={100}  />
                    </div>
                    <div className="w-1/3 h-full flex justify-center">
                        <FaArrowRightArrowLeft size={40} color={"white"}/>
                    </div>
                    <div className="w-1/3 h-full">
                        <Image src={"https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=035"} alt="" width={100} height={100} className="rounded-full aspect-square"/>
                    </div>
                </div>

                {/** Details */}
                <div className="flex flex-col w-full h-full justify-center items-start m-3 pl-4">
                    <h1 className="text-xl text-white">{`Swap ${tokenSwapFromAmount} ${tokenSwapFrom} to ${tokenSwapTo}`}</h1>
                </div>
            </div>
        </div>
    );
}

export default SwapCard;