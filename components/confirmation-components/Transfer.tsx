import Image from "next/image";
import { FaArrowRight } from "react-icons/fa6";

type TransferCardProps = {
    receiverName: string;
    receiverWalletAddress: string;
    transferToken: any;
    transferAmount: number;
}

const TransferCard = ({receiverName, receiverWalletAddress, transferToken, transferAmount} : TransferCardProps) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full p-6 font-semibold backdrop-blur-sm card-gradient rounded-xl drop-shadow-lg hover:drop-shadow-2xl text-[#9d9d9d]">
            <div>
                <h1 className="text-lg font-bold mb-3 text-white">Transfer</h1>
            </div>
            <div className="flex flex-col w-full justify-center items-center">
                {/** Logos */}
                <div className="flex w-2/3 justify-around items-center m-4 sm:m-0">
                    <div className="w-1/3 h-full ">
                        <Image src={transferToken? transferToken.logoURI : "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png"} alt="" width={100} height={100}  />
                    </div>
                    <div className="w-1/3 h-full flex justify-center">
                        <FaArrowRight size={40} color={"white"}/>
                    </div>
                    <div className="w-1/3 h-full">
                        <Image src={`https://api.cloudnouns.com/v1/pfp?text=${receiverWalletAddress}`} alt="" width={100} height={100} className="rounded-full aspect-square"/>
                    </div>
                </div>

                {/** Details */}
                <div className="flex flex-col w-full h-full justify-center items-start m-3 pl-4">
                    <h1 className="text-xl text-white">{`Amount: ${transferAmount} ${transferToken.symbol}`}</h1>
                    <h1 className="text-xl text-white">{`To: ${receiverName} (${receiverWalletAddress.slice(0, 5)}...${receiverWalletAddress.slice(-3)})`}</h1>
                </div>
            </div>
        </div>
    );
}

export default TransferCard;