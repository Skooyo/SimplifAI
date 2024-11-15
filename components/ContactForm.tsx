"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import Modal from "react-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createContact } from "@/lib/db_actions/contact-actions";
import { useRouter } from "next/navigation";

// Define the schema for the form
const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  walletAddress: z.string().min(1, { message: "Wallet address is required" }),
});

type ModalProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  userWalletAddress: string;
  pageUpdate: boolean;
  setPageUpdate: React.Dispatch<React.SetStateAction<boolean>>;
};

const ContactForm = ({userWalletAddress, isOpen, setIsOpen, pageUpdate, setPageUpdate}: ModalProps) => {

  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      walletAddress: "",
    },
  });

  const handleCloseModal = () => {
    setIsOpen(false); // Close the modal
    form.reset(); // Reset the form when closing
  };

  async function onSubmit(values: z.infer<typeof formSchema>): Promise<void> {
    console.log(values)
    createContact(userWalletAddress, values.name, values.walletAddress); // Create a new contact
    setPageUpdate(!pageUpdate); // Update the page to reflect the changes
    handleCloseModal(); // Close the modal after submission
  }

  const customStyles = {
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.6)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "white",
      border: "none",
      padding: "0px",
      borderRadius: "16px",
      overflow: "visible",
      width: "90%", // Adjust width to fit the screen
      maxWidth: "900px",
      height: "fit", // Adjust height to fit the screen
      maxHeight: "90vh", // Ensure it doesn't exceed viewport height
    },
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleCloseModal}
      style={customStyles}
      ariaHideApp={false}
    >
      <div className="w-full p-4 px-8 min-h-fit bg-gray-700 flex flex-col gap-6 text-white rounded-2xl pb-10">
        <div className="items-center justify-center flex">
          <p className="font-semibold text-2xl mt-4">Add a new contact</p>
        </div>
        <Form {...form}>
            <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="bg-gray-700 h-full flex flex-col gap-5"
            >
             
            <FormField
              control={form.control}
              name="name"
              render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState.invalid ? "text-red-500" : ""}>Name:</FormLabel>
                <FormControl>
                <Input
                  {...field}
                  className="border-black rounded-xl text-white bg-gray-800"
                  placeholder="Enter Name"
                />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
              )}
            />
             
            <FormField
              control={form.control}
              name="walletAddress"
              render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel className={fieldState.invalid ? "text-red-500" : ""}>Wallet Address:</FormLabel>
                <FormControl>
                <Input
                  {...field}
                  className="border-black rounded-xl text-white bg-gray-800"
                  placeholder="Enter wallet address"
                />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
              )}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="mt-12 text-black font-semibold px-16 w-full text-lg bg-green-400 bg-opacity-80 rounded-full drop-shadow-xl"
            >
              Add new contact
            </Button>
            </form>
        </Form>
      </div>
    </Modal>
  );
};

export default ContactForm;