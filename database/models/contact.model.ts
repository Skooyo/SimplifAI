import { model, models, Schema } from "mongoose";

export interface IContacts {
    _id: string;
    contactOwner: string;
    contacts: {
        _id: string;
        name: string;
        walletAddress: string;
    }[];
}

const ContactsSchema = new Schema<IContacts>({
    contactOwner: {
        type: String,
        required: true,
    },
    contacts: [
        {
            name: {
                type: String,
                required: true,
            },
            walletAddress: {
                type: String,
                required: true,
            },
        },
    ],
});

const Contacts = models.Contacts || model<IContacts>("Contacts", ContactsSchema);

export default Contacts;