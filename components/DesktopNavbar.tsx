"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const DesktopNavbar = () => {
  const pathname = usePathname();

  return (
    <div className="fixed top-0 left-0 z-50 w-full transition-all duration-500 max-lg:py-4 py-2 bg-black bg-opacity-50 backdrop-blur-[8px] flex justify-between items-center px-20">
      <img src="/images/xora.svg" width={160} height={55} alt="logo" />
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
      <img
        src="/images/xora.svg"
        width={160}
        height={55}
        alt="logo"
        className="opacity-0 pointer-events-none"
      />
    </div>
  );
};

export default DesktopNavbar;
