import React from "react";
import { BsFillLightningChargeFill } from "react-icons/bs";

type BarPercentageProps = {
  barPercentage: number;
  option: string;
};

const BarPercentage = ({ barPercentage, option }: BarPercentageProps) => {
  return (
    <div className="w-full flex">
      <div className="flex flex-col gap-6 w-full">
        <div className="flex gap-2">
          <div className="flex flex-row gap-3 w-full items-center">
            <div className="bg-[#4c4c4f] bg-opacity-20 rounded-xl h-[30px] p-1 relative w-full border border-[#4c4c4f] border-opacity-20 border-3">
              <span className="absolute inset-0 flex items-center justify-center mix-blend-difference">
                {barPercentage.toFixed(2)}%
              </span>
              <div
                className="bg-gradient-to-r from-[#f5ff45] to-[#26e400] h-full rounded-md"
                style={{ width: `${barPercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarPercentage;
