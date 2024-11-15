"use client";

import Image from "next/image";
import React from "react";
import { Element } from "react-scroll";

const HowToUse = () => {
  return (
    <section className="z-[2] mt-24 mb-60">
      <Element name="How To Use">
        <div className="w-screen flex justify-center items-center">
          <div className="md:mt-0 mt-32 relative w-full  pb-40 pt-28 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16 flex justify-center items-center flex-col">
            <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm tracking-wider">
              <span className="rounded-xl bg-v2-text-gradient bg-clip-text text-transparent group-disabled:bg-none group-disabled:text-[#CFF3FF] group-disabled:text-opacity-25 font-semibold">
                SimplifAI{" "}
              </span>
              Your Process
            </h3>

            <div className="relative z-4 mx-auto flex w-[375px] rounded-3xl border-[3px] border-s4/25 bg-[#040c04]/50 p-2 backdrop-blur-[6px] max-md:w-3/4" />

            <div className="pricing-bg">
              <img
                src="/images/bg-outlines.svg"
                width={960}
                height={380}
                alt="outline"
                className="relative z-2"
              />
              <img
                src="/images/bg-outlines-fill.png"
                width={960}
                height={380}
                alt="outline"
                className="absolute inset-0 opacity-5 mix-blend-soft-light"
              />
            </div>

            <div className="mt-60 w-4/5 flex flex-col gap-[500px] justify-center items-center">
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col w-2/5 gap-4">
                  <h1 className="h4 text-p4 max-md:h5">
                    Open the App & Connect Your Wallet
                  </h1>
                  <p className="body-3 text-gray-400">
                    Simple & Secure connection to your wallet, no complicated
                    setups required.
                  </p>
                </div>
                <Image src="/phala.png" width={256} height={256} alt="phone" />
              </div>
              <div className="flex items-center justify-between w-full">
                <Image src="/phala.png" width={256} height={256} alt="phone" />
                <div className="flex flex-col w-2/5 gap-4">
                  <h1 className="h4 text-p4 max-md:h5">Voice Command</h1>
                  <p className="body-3 text-gray-400">
                    Speak your command to set up your actions, and SimplifAI
                    will process and prepare the transaction for you.
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between w-full">
                <div className="flex flex-col w-2/5 gap-4">
                  <h1 className="h4 text-p4 max-md:h5">Confirm and Go</h1>
                  <p className="body-3 text-gray-400">
                    You stay in control. Review the transaction, approve, and
                    let SimplifAI complete it in seconds.
                  </p>
                </div>
                <Image src="/phala.png" width={256} height={256} alt="phone" />
              </div>
            </div>
          </div>
        </div>
      </Element>
    </section>
  );
};

export default HowToUse;
