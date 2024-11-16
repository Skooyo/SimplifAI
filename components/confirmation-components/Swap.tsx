import Image from "next/image";
import { FaArrowRightArrowLeft } from "react-icons/fa6";

type SwapCardProps = {
    tokenSwapFrom: any;
    tokenSwapTo: any;
    tokenSwapFromAmount: number;
}

const SwapCard = ({tokenSwapFrom, tokenSwapTo, tokenSwapFromAmount} : SwapCardProps) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full p-6 font-semibold backdrop-blur-sm card-gradient rounded-xl mb-1 text-[#9d9d9d]">
            <div className="flex flex-col w-full justify-center items-center">
                {/** Logos */}
                <div className="flex w-2/3 justify-around items-center m-4 sm:m-0">
                    <div className="w-1/3 h-full ">
                        <Image
                            src={tokenSwapFrom ? tokenSwapFrom.logoURI :
                                "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"}
                            alt=""
                            width={100}
                            height={100}
                        />
                    </div>
                    <div className="w-1/3 h-full flex justify-center">
                        <FaArrowRightArrowLeft size={30} color={"#8c8c8c"}/>
                    </div>
                    <div className="w-1/3 h-full">
                        <Image
                            src={tokenSwapTo ? tokenSwapTo.logoURI :
                                "https://cryptologos.cc/logos/usd-coin-usdc-logo.svg?v=035"}
                            alt=""
                            width={100}
                            height={100}
                            className="rounded-full aspect-square"
                        />
                    </div>
                </div>

                {/** Details */}
                <div className="flex flex-col w-full h-full justify-center items-center m-3">
                    
                    <div>
                        <h1 className="text-2xl font-light h6 tracking-wider pt-5">
                            Swap
                        </h1>
                    </div>
                    <h1 className="text-[40px] text-white pb-8">{`${tokenSwapFromAmount.toString()} ${
                        tokenSwapFrom.symbol
                    }`}</h1>
                    
                    <div
                        className="w-full grid grid-cols-2 p-4 gap-3 text-lg"
                        style={{ gridTemplateColumns: "1fr 2fr" }}
                    >
                        <div>
                            <h1 className="text-white">From :</h1>
                        </div>
                        <div className="flex items-center justify-end">
                            <h1 className="">{`${tokenSwapFromAmount} ${tokenSwapFrom.symbol}`}</h1>
                        </div>
                        <div>
                            <h1 className="text-white">To :</h1>
                        </div>
                        <div className="flex items-center justify-end">
                            <h1>{tokenSwapTo.symbol}</h1>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default SwapCard;