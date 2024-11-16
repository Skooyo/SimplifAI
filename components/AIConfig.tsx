import Image from "next/image";

interface AIConfigParams {
  tradeMin: number; // min price
  tradeMax: number; // max price
  orderType: string; // buy or sell
  quantity: number; // num to sell or buy
  transactionCount: number; // default to 3, count down
  lastTimeStampSinceTransaction: Date; // date of last transaction
}

const ETHLogo = "https://tokens.1inch.io/0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.png";
const USDCLogo = "/usdc.svg";

const AIConfig = ({ config }: { config: AIConfigParams }) => {
  return (
    <>
      <div className="flex md:w-[40%] w-[80%] h-full pt-2 pb-2 items-center font-semibold backdrop-blur-sm card-gradient rounded-xl drop-shadow-lg hover:drop-shadow-2xl text-[#9d9d9d]">
        <div className="flex w-full h-[50%]">
          <Image src={ETHLogo} width={50} height={50} alt=""/>
          <Image src={USDCLogo} width={50} height={50} alt=""/>
        </div>
      </div>
    </>
  );
};

export default AIConfig;
