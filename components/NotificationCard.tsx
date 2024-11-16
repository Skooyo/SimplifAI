import Image from "next/image";
import { AiOutlineNotification } from "react-icons/ai";

interface Notification {
  messageContent: string;
  timestamp: number;
}

const NotificationCard = ({ notification }: { notification: Notification }) => {
  return (
    <>
      <div className="flex w-full h-full pt-2 pb-2 items-center backdrop-blur-sm card-gradient border-l-8 border-[#c7f284] rounded-xl drop-shadow-lg hover:drop-shadow-2xl text-[#9d9d9d]">
        <div className="w-24 mx-5 h-16 flex justify-center items-center">
          <Image
            src="/push-color.png"
            alt="push-color"
            width={60}
            height={60}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col w-full h-full items-center mr-5 text-wrap py-3">
          <div className="w-full h-full text-lg text-wrap text-ellipsis overflow-hidden">
            <p className="w-full leading-6 text-base">
              {notification.messageContent}
            </p>
          </div>
          <div className="w-full text-sm flex justify-start">
            <p className="text-[14px] leading-[18px] tracking-[0.03em] mt-2 text-[#6e6e6e]">
              {new Date(notification.timestamp).toLocaleString("en-US", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}{" "}
              {new Date(notification.timestamp).toLocaleDateString("en-US", {
                day: "numeric",
                month: "short",
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotificationCard;
