import React from 'react';
import {EMessageType} from "../types/enums";
import moment from "moment";

type TMessageProps = {
    message: TMessage;
    messageType: EMessageType;
}

const MESSAGE_STYLE = {
    [EMessageType.BOT_MESSAGE]: ' bg-darkGray text-white',
    [EMessageType.OWN_MESSAGE]: ' bg-gray-300 text-gray-800 ml-auto',
}

const Message = ({message, messageType}: TMessageProps) => {
    return (
        <div className={'max-w-96 flex flex-col'}>
            <p className={'rounded-xl text-wrap break-words p-2 text-l w-fit ' + MESSAGE_STYLE[messageType]}>{message.text}</p>
            <span className={'text-gray-500 text-xs mt-0.5 ' + (messageType === EMessageType.OWN_MESSAGE ? 'ml-auto' : '')}>
                {moment(message.createdAt).format('D/MM/YYYY, h:mm A') + (message.createdAt !== message.updatedAt ? ' Edited' : '')}
            </span>
        </div>
    );
};

export default Message;