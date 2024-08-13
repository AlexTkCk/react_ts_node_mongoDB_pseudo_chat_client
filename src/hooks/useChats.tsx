import React, {useCallback, useEffect, useState} from 'react';
import {API_URL} from "../constants";

const UseChats = (clientId: string, searchQuery: string) => {

    const [chats, setChats] = useState<TChat[]>([]);
    const [currentChat, setCurrentChat] = useState<TChat | null>(null);

    const handleNewChat = useCallback((data: {
        botName: string,
            botSurName: string,
    }) => {
        fetch(API_URL + '/chats', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...data, clientId})
        }).then(res => res.json()).then((snapshot: TChat) => {
            setChats((prevChats) => [...prevChats, snapshot]);
        })
    }, [])

    const handleUpdateChat = useCallback((chatId: string, update: Record<string, string>) => {
        const chat = chats.find((chat) => chat._id === chatId);

        if (JSON.stringify(update) !== JSON.stringify({
            botName: chat?.botName,
            botSurName: chat?.botSurName
        })) {
            setChats(prev => prev.map(chat => {
                if (chat._id === chatId) {
                    setCurrentChat({...chat, ...update});
                    return {...chat, ...update};
                }
                return chat;
            }));

            fetch(API_URL + '/chats', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    chatId,
                    ...update
                })
            })
        }
    }, [])

    const handleDeleteChat = useCallback((chatId: string) => {
        fetch(API_URL + '/chats', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({chatId})
        }).then(res => {
            if (res.ok) {
                setChats(prev => prev.filter(chat => chat._id !== chatId));
                return;
            }

            console.log(res.json())
        })
    }, [])

    const loadChats = useCallback(() => {
        fetch(API_URL + `/chats/client/${clientId}?searchQuery=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => setChats(data));
    }, [searchQuery])

    useEffect(() => {
        loadChats()
    }, [searchQuery]);

    return {chats, handleNewChat, handleUpdateChat, handleDeleteChat, currentChat, setCurrentChat, loadChats} as const;
};

export default UseChats;