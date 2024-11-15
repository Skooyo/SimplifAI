"use client";

import { useState, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    console.log("Add contact");
  };

  const { primaryWallet } = useDynamicContext() || "";

  return (
    <>
      <div className="w-full h-screen flex-col flex items-center gap-8 p-8">
        <div>
          <button
            className="bg-gray-700 font-semibold w-fit h-fit py-2 px-4 rounded-full"
            onClick={handleClick}
          >
            Add Contact
          </button>
        </div>
        <ContactList walletAddress={primaryWallet?.address || ""} pageUpdate={pageUpdate} setPageUpdate={setPageUpdate}/>
      </div>
      <ContactForm userWalletAddress={primaryWallet?.address || ""} isOpen={showModal} setIsOpen={setShowModal} pageUpdate={pageUpdate} setPageUpdate={setPageUpdate}/>
    </>
  );
}