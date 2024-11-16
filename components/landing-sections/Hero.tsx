"use client";

import { Element, Link as LinkScroll } from "react-scroll";
import Button from "../landing-components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Hero = () => {
  const router = useRouter();
  const handleClick = () => {
    router.push("/dashboard");
  };
  return (
    <>
      <div className="background z-[1] absolute top-0 w-full h-full left-0" />
      <section className="bg-transparent relative pt-60 pb-40 max-lg:pt-52 max-lg:pb-36 max-md:pt-36 max-md:pb-32">
        <Element name="hero">
          <div className="bg-transparent container flex min-h-0 mb-10">
            <div className="relative z-2 max-w-[530px] max-lg:max-w-388 flex-grow">
              <div className="caption small-2 uppercase text-p3 text-lg">
                your crypto experience
              </div>

              <div className="rounded-xl bg-v2-text-gradient bg-clip-text text-transparent group-disabled:bg-none group-disabled:text-[#CFF3FF] group-disabled:text-opacity-25 md:-mt-3 text-sm font-semibold leading-none">
                <span className="mb-6 h1 uppercase max-lg:mb-7 max-lg:h2 max-md:mb-4 max-md:text-5xl max-md:leading-12">
                  Simplified
                </span>
              </div>
              <p className="max-w-[500px] mb-14 body-3 text-xl max-md:mb-10">
                SimplifAI is an AI-Assistant that helps abstract away your
                crypto experience through AI powered solutions.
              </p>
              <div className="">
                <Button icon="/zap.svg" onClick={handleClick}>
                  Launch App
                </Button>
              </div>
            </div>

            <div className="ml-20 left-[calc(50%-100px)] scale-125 top-[120px] absolute pointer-events-none hero-img_res flex-grow z-[2]">
              <Image
                width={1920}
                height={1920}
                src="/mobile-hero2.png"
                className="w-[1500px] max-lg:h-auto hidden md:block"
                alt="phone"
              />
            </div>
          </div>
        </Element>
      </section>
    </>
  );
};

export default Hero;
