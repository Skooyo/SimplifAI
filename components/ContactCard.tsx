import Image from 'next/image';

type ContactCardProps = {
  contact: {
    name: string;
    walletAddress: string;
  }
}

const ContactCard = ({contact}: ContactCardProps) => {
  return (
    <div className="w-full md:w-1/3 h-1/8 bg-gray-700 rounded-xl p-4 flex justify-between items-center font-semibold">
      <div className="w-1/6 bg-transparent rounded-full aspect-square relative">
        <Image src={`https://api.cloudnouns.com/v1/pfp?text=${contact.walletAddress}`} 
        fill 
        style={{objectFit:"contain"}} 
        alt="token" 
        className="rounded-full " 
        />
      </div>
      <p>{contact.name}</p>
      <p>{contact.walletAddress}</p>
    </div>
  );
}

export default ContactCard;