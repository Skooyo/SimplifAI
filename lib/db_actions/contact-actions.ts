"use server"

import { connectToDatabase } from "../database";
import Contacts from "../database/models/contact.model";
import { handleError } from "../utils";
import { revalidatePath } from "next/cache";

export const getAllContacts = async () => {
    try {
      await connectToDatabase();
  
      const contacts = await Contacts.find();

      console.log("contacts have been fetced")
  
      return JSON.parse(JSON.stringify(contacts));
    } catch (error) {
      console.error("Error fetching contacts:", error);
      handleError(error);
    }
}

export const getContactByOwner = async (contactOwner: string) => {
    try {
      await connectToDatabase();
  
      const contact = await Contacts.findOne({ contactOwner });
      console.log(contact);
      return JSON.parse(JSON.stringify(contact));
    } catch (error) {
        console.error("Error fetching contact:", error);
        handleError(error);
    }
}

export const getContactAddressByName = async (contactOwner: string, contactName: string) => {
  try {
    await connectToDatabase();

    const contactBook = await getContactByOwner(contactOwner);

    for (const contact of contactBook.contacts) {
      if (contact.name === contactName) {
        return JSON.parse(JSON.stringify(contact))
      }
    }
  } catch (error) {
    console.error("Error fetching contact:", error);
    handleError(error);
  }
}

export const createContact = async (contactOwner: string, name: string, walletAddress: string) => {
  try {
    await connectToDatabase();

    try {
      const contactList = await Contacts.findOne({ contactOwner });

      if (!contactList) {
        throw new Error("Contact list not found");
      }

      const updatedContactList = await Contacts.findByIdAndUpdate(contactList._id,
        {
          $push: {
            contacts: {
              name,
              walletAddress,
            },
          },
        },
        { new: true }
      )

      if (updatedContactList) revalidatePath("/contacts");
      return JSON.parse(JSON.stringify(updatedContactList));
    } catch {
      const newContact = await Contacts.create({ contactOwner, contacts: [{ name, walletAddress }] });

      console.log("am i here 2")

      revalidatePath("/contacts");
      return JSON.parse(JSON.stringify(newContact));
    }
  } catch (error) {
    console.error("Error creating contact:", error);
    handleError(error);
  }
}