"use client";

import Link from 'next/link'
import { AiOutlineHome } from "react-icons/ai";
import { usePathname } from 'next/navigation';
import { LuWallet } from "react-icons/lu";
import { LuContact } from "react-icons/lu";
import { useEffect, useState } from 'react';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

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
    <nav className = "w-full px-2 py-6 bg-[#29292b] fixed bottom-0 position-sticky z-50 rounded-t-md">
        <div className="justify-between mx-auto px-2 gap-2 items-center flex">
          <Link href={`${connected ? "dashboard" : "dashboard"}`} 
          className={`flex gap-2 items-center w-full h-full p-1 justify-center border border-solid 
          border-opacity-15 rounded-full
          ${pathName === "/dashboard" ? "border-[#26e400] bg-[#26e400] bg-opacity-15" : ""}`}>
            {pathName === "/dashboard" ? 
            <AiOutlineHome className="text-xl" style={{color:'#26e400', opacity:20}}/> : 
            <AiOutlineHome className="text-xl" style={{color:'white'}}/>
            }
            {pathName === "/dashboard" ? 
            "" :
            <h1 className="text-xs">Dashboard</h1>
            }
          </Link>
          <Link href={`${connected ? "portfolio" : "dashboard"}`} 
          className={`flex gap-2 items-center w-full h-full p-1 justify-center border border-solid 
          border-opacity-15 rounded-full
          ${pathName === "/portfolio" ? "border-[#26e400] bg-[#26e400] bg-opacity-15" : ""}`}>
            {pathName === "/portfolio" ? 
            <LuWallet className="text-xl" style={{color:'#26e400', opacity:20}}/> : 
            <LuWallet className="text-xl" style={{color:'white'}}/>
            }
            {pathName === "/portfolio" ? 
            "" :
            <h1 className="text-xs">Portfolio</h1>
            }
          </Link>
          <Link href={`${connected ? "contacts" : "dashboard"}`} 
          className={`flex gap-2 items-center w-full h-full p-1 justify-center border border-solid 
          border-opacity-15 rounded-full
          ${pathName === "/contacts" ? "border-[#26e400] bg-[#26e400] bg-opacity-15" : ""}`}>
            {pathName === "/contacts" ? 
            <LuContact className="text-xl" style={{color:'#26e400', opacity:20}}/> : 
            <LuContact className="text-xl" style={{color:'white'}}/>
            }
            {pathName === "/contacts" ? 
            "" :
            <h1 className="text-xs">Contacts</h1>
            }
          </Link>
        </div>
      </nav>
  )
}