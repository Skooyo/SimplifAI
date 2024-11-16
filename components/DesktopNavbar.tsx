"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IoIosNotificationsOutline } from "react-icons/io";
import React, { useEffect, useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import NotificationWidget from "./NotificationWidget";

const DesktopNavbar = () => {
  const pathname = usePathname();

  const { primaryWallet } = useDynamicContext();
  const [walletAddress, setWalletAddress] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (primaryWallet && !walletAddress) {
      setConnected(true);
      setWalletAddress(primaryWallet.address);
    }
  }, [primaryWallet]);

  return (
    <div className="fixed top-0 left-0 z-50 w-full transition-all duration-500 max-lg:py-4 py-2 bg-black bg-opacity-50 backdrop-blur-[8px] flex justify-between items-center px-20">
      <div className="flex justify-center items-center">
        <img src="/images/xora.svg" width={160} height={55} alt="logo" />
        <div>
          <IoIosNotificationsOutline
            className="opacity-0 pointer-events-none"
            size={30}
          />
        </div>
      </div>
      <ul className="flex items-center justify-center gap-20">
        <li className="nav-li">
          <Link
            href="/dashboard"
            className={`base-bold uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5 ${
              pathname === "/dashboard" ? "text-p3" : "text-p4"
            }`}
          >
            Dashboard
          </Link>
        </li>
        <li className="nav-li">
          <Link
            href="/portfolio"
            className={`base-bold uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5 ${
              pathname === "/portfolio" ? "text-p3" : "text-p4"
            }`}
          >
            Portfolio
          </Link>
        </li>
        <li className="nav-li">
          <Link
            href="/contacts"
            className={`base-bold uppercase transition-colors duration-500 cursor-pointer hover:text-p1 max-lg:my-4 max-lg:h5 ${
              pathname === "/contacts" ? "text-p3" : "text-p4"
            }`}
          >
            Contacts
          </Link>
        </li>
      </ul>
      <div className="flex justify-center items-center">
        <img
          src="/images/xora.svg"
          width={160}
          height={55}
          alt="logo"
          className="opacity-0 pointer-events-none"
        />
        <div className="cursor-pointer">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger className="trigger-class">
              <IoIosNotificationsOutline size={30} />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content className="content-class">
              <DropdownMenu.Item className="item-class">
                <NotificationWidget
                  connectedWallet={walletAddress}
                  loadNotifs={true}
                />
              </DropdownMenu.Item>
              {/* <DropdownMenu.Item className="item-class">
                Item 2
              </DropdownMenu.Item>
              <DropdownMenu.Item className="item-class">
                Item 3
              </DropdownMenu.Item> */}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </div>
      </div>
    </div>
  );
};

export default DesktopNavbar;
