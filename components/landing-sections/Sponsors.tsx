import Image from "next/image";
import React from "react";

const Sponsors = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center -mt-5 mb-20 text-p4 font-semibold text-xl">
      Powered By
      <div className="md:mt-6 mt-10 flex justify-center items-center px-6 rounded-2xl gap-7 text-lg mb-5 flex-wrap">
        <Image src="/dynamic.png" alt="dynamic" width={150} height={30} />
        <Image src="/1inch.png" alt="1inch" width={115} height={20} />
        <Image src="/pyth.png" alt="pyth" width={115} height={20} />
        <Image src="/phala.png" alt="phala" width={130} height={30} />
        <Image src="/circle.png" alt="circle" width={130} height={30} />
        <Image src="/polygon.png" alt="polygon" width={130} height={30} />
        <Image src="/push.png" alt="push" width={130} height={30} />
        <div className="flex justify-center items-center gap-2">
          <Image src="/noun.png" alt="nouns-dao" width={40} height={40} />
          <p>NounsDAO</p>
        </div>
      </div>
    </div>
  );
};

export default Sponsors;
