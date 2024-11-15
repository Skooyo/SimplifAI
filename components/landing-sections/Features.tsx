"use client";

import { Element } from "react-scroll";

import { features } from "../../constants/index.jsx";

const Features = () => {
  return (
    <section className="z-[2]">
      <Element name="features">
        <div className="md:mx-20 mx-4 mt-20">
          <div className="pricing-head_before md:mt-0 mt-32 relative bg-[#040c04]/50 pb-40 pt-28 max-xl:max-w-4xl max-lg:border-none max-md:pb-32 max-md:pt-16">
            <h3 className="h3 max-lg:h4 max-md:h5 z-3 relative mx-auto mb-14 max-w-lg text-center text-p4 max-md:mb-11 max-sm:max-w-sm tracking-wider">
              Powerful Features In{" "}
              <span className="rounded-xl bg-v2-text-gradient bg-clip-text text-transparent group-disabled:bg-none group-disabled:text-[#CFF3FF] group-disabled:text-opacity-25 font-semibold">
                Your{" "}
              </span>{" "}
              Hands
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
          </div>
          <div className="relative flex flex-nowrap border-2 border-s3 rounded-7xl -mt-24 max-md:flex-col feature-after md:g7 max-md:border-none max-md:rounded-none max-md:gap-3">
            {features.map(({ id, caption, title, text, button }) => (
              <div
                key={id}
                className="relative z-2 md:px-10 px-5 md:pb-10 pb-5 flex-50 max-md:g7 max-md:border-2 max-md:border-s3 max-md:rounded-3xl max-md:flex-320 md:max-w-[30vw]"
              >
                <div className="w-full flex justify-start items-start">
                  <div className="-ml-3 mb-12 flex items-center justify-center flex-col">
                    <div className="w-0.5 h-16 bg-transparent" />
                  </div>
                </div>

                <p className="caption mb-5 max-md:mb-6 leading-[16px]">
                  {caption}
                </p>
                <h2 className="max-w-400 mb-7 h3 text-p4 max-md:mb-6 max-md:h5">
                  {title}
                </h2>
                <p className="mb-11 body-3 text-lg max-md:mb-8 max-md:body-3">
                  {text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Element>
    </section>
  );
};
export default Features;
