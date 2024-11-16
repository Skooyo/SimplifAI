"use client";

import { DynamicWallet } from "@/components/DynamicWallet";
import { useDynamicContext, useIsLoggedIn } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";
import { useEffect } from "react";
import { getUserByUserID } from "@/lib/db_actions/user-actions";

const Header = () => {
  const isLoggedIn = useIsLoggedIn();
  const { primaryWallet } = useDynamicContext();

  const fetchUser = async (userID: string) => {
    return await getUserByUserID(userID);
  };

  useEffect(() => {
    if (isLoggedIn && primaryWallet) {
      console.log("wallet is", primaryWallet);
      const user = fetchUser(primaryWallet.address);
      console.log("logged user is :", user);
    }
  }, [isLoggedIn, primaryWallet]);

  return (
    <>
      <div className="w-full h-full flex-col flex items-center gap-4">
        <div className="w-full h-[80%] bg-red-500">
          <Image
            src="/firewatch-gradient-slim.png"
            alt="header-img"
            width={2000}
            height={2000}
            style={{ objectFit: "cover" }}
            className="h-full"
          />
        </div>{" "}
        {/* BG Image Placeholder */}
        <div className="w-1/3 md:w-1/12 bg-blue-500 -mt-24 mb-6 rounded-full aspect-square relative overflow-hidden p-16">
          <Image
            src={`https://api.cloudnouns.com/v1/pfp?text=${primaryWallet?.address}`}
            fill
            style={{ objectFit: "cover" }}
            alt=""
            className="absolute rounded-full aspect-square"
          />
        </div>
        {/* Profile Picture Placeholder */}
        <DynamicWallet />
      </div>
    </>
  );
};

export default Header;
