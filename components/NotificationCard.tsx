import { AiOutlineNotification } from "react-icons/ai";

interface Notification {
    messageContent: string;
    timestamp: number;
}

const NotificationCard = ({ notification }: { notification: Notification }) => {
    return (
        <>
            <div className="flex w-full h-full pt-2 pb-2 items-center backdrop-blur-sm bg-white/30 border-l-8 border-blue-950 rounded-xl drop-shadow-lg hover:drop-shadow-2xl">
                <div className="w-20 h-16 flex justify-center items-center">
                    <AiOutlineNotification size={30} />
                </div>
                <div className="flex flex-col w-full h-full items-center mr-5 text-wrap">
                    <div className="w-full h-full text-lg text-wrap text-ellipsis overflow-hidden">
                        <p className="w-full">{notification.messageContent}</p>
                    </div>
                    <div className="w-full text-sm flex justify-start">
                        <p>{new Date(notification.timestamp).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })} {new Date(notification.timestamp).toLocaleDateString('en-US', { day: 'numeric', month: 'short' })}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NotificationCard;