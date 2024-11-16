import Image from "next/image";

type ContactCardProps = {
  contact: {
    name: string;
    walletAddress: string;
  };
};

const ContactCard = ({ contact }: ContactCardProps) => {
  return (
    <div className="w-full md:w-1/3 h-1/8 card-gradient rounded-xl p-4 flex justify-between items-center font-semibold gap-4">
      <div className="w-1/6 bg-transparent rounded-full aspect-square relative flex-shrink-0">
        <Image
          src={`https://api.cloudnouns.com/v1/pfp?text=${contact.walletAddress}`}
          fill
          style={{ objectFit: "contain" }}
          alt="token"
          className="rounded-full "
        />
      </div>
      <div className="flex-grow h-full flex flex-col overflow-hidden">
        <p className="truncate w-full body-1">{contact.name}</p>
        <p className="w-full text-[#6e6e6e]">
          {`${contact.walletAddress.slice(
            0,
            12
          )}...${contact.walletAddress.slice(
            contact.walletAddress.length - 10,
            contact.walletAddress.length
          )}`}
        </p>
      </div>
    </div>
  );
};

export default ContactCard;
