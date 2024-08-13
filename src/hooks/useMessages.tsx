import React, {useCallback, useEffect} from 'react';
import {API_URL} from "../constants";
import message from "../components/Message";

const UseMessages = (chats: TChat[]) => {
    const [messages, setMessages] = React.useState<TMessage[]>([]);

    const handleNewMessage = useCallback((message: TMessage) => {
        setMessages((prevMessages) => [...prevMessages, message]);
    }, [])

    const handleUpdateMessage = useCallback((messageId: string, newText: string) => {
        const message = messages.find((message) => message._id === messageId);

        if (newText !== message?.text) {
            setMessages(prev => prev.map(message => {
                if (message._id === messageId) {
                    return {...message, text: newText, updatedAt: new Date()};
                }
                return message;
            }));

            fetch(API_URL + '/messages', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    id: messageId,
                    text: newText
                })
            })
        }
    }, [])

    useEffect(() => {
        Promise.all(chats.map((chat) => {
            return fetch(API_URL + `/messages/${chat._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }).then(res => res.json()).then((data) => data)
        })).then(results => {
            setMessages(results.reduce((prev, curr) => [...prev, ...curr], []))
        })

    }, [chats]);

    return [messages, handleNewMessage, handleUpdateMessage] as const;
};

export default UseMessages;