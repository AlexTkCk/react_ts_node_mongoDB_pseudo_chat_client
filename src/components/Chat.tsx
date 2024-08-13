import React from 'react';
import moment from "moment";
import {CiCircleCheck} from "react-icons/ci";

type TChatProps = {
    chat: TChat;
    lastMessage: TMessage | undefined;
    handleClick: () => void;
}

const Chat = ({chat, lastMessage, handleClick}: TChatProps) => {
    return (
        <div onClick={handleClick} className={'cursor-pointer px-2 py-4 border-b border-gray-300 flex items-start'}>
            <div className={"relative aspect-square h-16"}>
                <img src={chat.botAvatarUrl} alt="" className={"aspect-square h-16 rounded-full"}/>
                <CiCircleCheck className={'absolute -bottom-0.5 -right-0.5 text-m text-green-500 z-10'}/>
            </div>
            <div className={'min-w-0'}>
                <h1 className={'text-gray-700 text-l font-semibold'}>{chat.botName} {chat.botSurName}</h1>
                <p className={'text-nowrap truncate text-gray-500 mr-2'}>{lastMessage?.text}</p>
            </div>
            <span className={'flex-shrink-0 text-xs ml-auto'}>{lastMessage ? moment(lastMessage.createdAt).format('MMM D, YYYY') : ''}</span>
        </div>
    );
};

export default Chat;