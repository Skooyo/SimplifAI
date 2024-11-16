import { useEffect, useState } from "react";
import ContactCard from "./ContactCard";
import {
  getContactByOwner,
  getContactAddressByName,
} from "@/lib/db_actions/contact-actions";

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      if (walletAddress) {
        const fetchedContacts = (await getContactByOwner(walletAddress)) || [];
        setContacts(fetchedContacts.contacts || []);
        const testContactByName = await getContactAddressByName(
          walletAddress,
          "testing add"
        );
        console.log(testContactByName);
      }
    };

    fetchContacts();
    setLoading(false);
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
