import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import { getContactByOwner } from "@/lib/db_actions/contact-actions";

const ContactList = ({ walletAddress, pageUpdate, setPageUpdate }: { walletAddress: string, pageUpdate: boolean, setPageUpdate: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (walletAddress) {
        const fetchedContacts = await getContactByOwner(walletAddress) || [];
        setContacts(fetchedContacts.contacts || []);
      }
    };

    fetchContacts();
  }, [walletAddress, pageUpdate]);

  return (
    <>
      {contacts.map((contact: { name: string; walletAddress: string }, index: number) => (
        <ContactCard key={index} contact={contact} />
      ))}
    </>
  );
};

export default ContactList;