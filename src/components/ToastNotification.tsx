import React, {useLayoutEffect, useState} from 'react';
import {API_URL} from "../constants";

type TToastNotificationProps = {
    data: TMessage,
    isShown: boolean,
}

const ToastNotification = ({data, isShown}: TToastNotificationProps) => {

    const [chat, setChat] = useState<TChat | null>(null);
    useLayoutEffect(() => {
        if (data && data.chatId)
            fetch(API_URL + `/chats/${data.chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json()).then(data => {
                setChat(data);
            });
    }, [data])

    return isShown ? (
        <div className={'absolute bottom-3 right-3 bg-white border border-gray-800 h-fit max-w-96 p-2 rounded-xl flex gap-3 items-center'}>
            <img src={chat?.botAvatarUrl} alt="" className={'aspect-square h-16 rounded-full'}/>
            <div className={'overflow-x-clip'}>
                <h1 className={'text-gray-700 text-l font-semibold'}>{chat?.botName} {chat?.botSurName}</h1>
                <p className={'text-nowrap truncate text-gray-500'}>{data.text}</p>
            </div>
        </div>
    ) : <></>;
};

export default ToastNotification;