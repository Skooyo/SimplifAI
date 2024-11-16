"use client";

import { useState, useEffect } from "react";
import { useDynamicContext } from "@dynamic-labs/sdk-react-core";
import ContactForm from "@/components/ContactForm";
import ContactList from "@/components/ContactList";
import { IoMdPersonAdd } from "react-icons/io";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [pageUpdate, setPageUpdate] = useState(false);

  const handleClick = () => {
    setShowModal(true);
    console.log("Add contact");
  };

  const { primaryWallet } = useDynamicContext() || "";

  return (
    <div className="md:flex md:w-screen md:justify-center md:items-center">
      <div className="w-full md:w-2/3 h-screen flex-col flex items-center gap-8 p-8 max-md:-mt-24">
        <p className="h5">Contacts</p>
        <ContactList
          walletAddress={primaryWallet?.address || ""}
          pageUpdate={pageUpdate}
          setPageUpdate={setPageUpdate}
        />
      </div>
      <div className="fixed bottom-28 md:bottom-12 right-5 flex items-end justify-end">
        <button
          className="rounded-3xl py-4 px-4 text-4xl text-white border-t-2 border-l-2 border-[#c7f284] bg-background hover:border-s4 transition-all duration-300 items-center flex justify-center"
          onClick={handleClick}
        >
          <IoMdPersonAdd className="" />
        </button>
      </div>
      <ContactForm
        userWalletAddress={primaryWallet?.address || ""}
        isOpen={showModal}
        setIsOpen={setShowModal}
        pageUpdate={pageUpdate}
        setPageUpdate={setPageUpdate}
      />
    </div>
  );
}
