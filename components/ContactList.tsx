import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import { getContactByOwner } from "@/lib/db_actions/contact-actions";

const ContactList = ({
  walletAddress,
  pageUpdate,
  setPageUpdate,
}: {
  walletAddress: string;
  pageUpdate: boolean;
  setPageUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const fetchContacts = async () => {
      if (walletAddress) {
        const fetchedContacts = (await getContactByOwner(walletAddress)) || [];
        setContacts(fetchedContacts.contacts || []);
      }
    };

    fetchContacts();
  }, [walletAddress, pageUpdate]);

  return (
    <div className="flex flex-col gap-3 w-full items-center">
      {contacts.map(
        (contact: { name: string; walletAddress: string }, index: number) => (
          <ContactCard key={index} contact={contact} />
        )
      )}
    </div>
  );
};

export default ContactList;
