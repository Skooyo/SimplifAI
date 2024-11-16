"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuWallet } from "react-icons/lu";
import { LuContact } from "react-icons/lu";
import { useEffect, useState } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import { IoIosNotificationsOutline } from "react-icons/io";
import { HiOutlineMicrophone } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";

export default function NavBar() {
  const [connected, setConnected] = useState(false);
  const { primaryWallet } = useDynamicContext();

  useEffect(() => {
    if (primaryWallet) {
      setConnected(true);
    }
  }, [primaryWallet]);

  const pathName = usePathname();

  return (
    <nav className="w-full px-2 py-6 bg-background border-t border-[#c7f284] rounded-full fixed bottom-0 position-sticky z-50">
      <div className="justify-between mx-auto px-2 gap-2 items-center flex">
        <Link
          href={`${connected ? "dashboard" : "dashboard"}`}
          className={`flex gap-2 items-center w-full h-full p-1 justify-center
          border-opacity-15 rounded-full`}
        >
          {pathName === "/dashboard" ? (
            <HiOutlineMicrophone
              className="text-xl"
              style={{ color: "#26e400", opacity: 20 }}
              size={28}
            />
          ) : (
            <HiOutlineMicrophone
              className="text-xl"
              style={{ color: "white" }}
              size={28}
            />
          )}
        </Link>
        <Link
          href={`${connected ? "portfolio" : "dashboard"}`}
          className={`flex gap-2 items-center w-full h-full p-1 justify-center
            border-opacity-15 rounded-full`}
        >
          {pathName === "/portfolio" ? (
            <LuWallet
              className="text-xl"
              style={{ color: "#26e400", opacity: 20 }}
              size={28}
            />
          ) : (
            <LuWallet
              className="text-xl"
              style={{ color: "white" }}
              size={28}
            />
          )}
        </Link>
        <Link
          href={`${connected ? "contacts" : "dashboard"}`}
          className={`flex gap-2 items-center w-full h-full p-1 justify-center
          border-opacity-15 rounded-full`}
        >
          {pathName === "/contacts" ? (
            <LuContact
              className="text-xl"
              style={{ color: "#26e400", opacity: 20 }}
              size={28}
            />
          ) : (
            <LuContact
              className="text-xl"
              style={{ color: "white" }}
              size={28}
            />
          )}
        </Link>
        <Link
          href={`${connected ? "notifications" : "dashboard"}`}
          className={`flex gap-2 items-center w-full h-full p-1 justify-center
          border-opacity-15 rounded-full`}
        >
          {pathName === "/notifications" ? (
            <IoIosNotificationsOutline
              className="text-xl"
              style={{ color: "#26e400", opacity: 20 }}
              size={28}
            />
          ) : (
            <IoIosNotificationsOutline
              size={28}
              className="text-xl"
              style={{ color: "white" }}
            />
          )}
        </Link>
        <Link
          href={`${connected ? "settings" : "dashboard"}`}
          className={`flex gap-2 items-center w-full h-full p-1 justify-center
          border-opacity-15 rounded-full`}
        >
          {pathName === "/settings" ? (
            <IoSettingsOutline
              className="text-xl"
              style={{ color: "#26e400", opacity: 20 }}
              size={28}
            />
          ) : (
            <IoSettingsOutline
              size={28}
              className="text-xl"
              style={{ color: "white" }}
            />
          )}
        </Link>
      </div>
    </nav>
  );
}
