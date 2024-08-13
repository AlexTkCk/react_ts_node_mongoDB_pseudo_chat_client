import React, {useCallback, useContext, useRef} from 'react';

import useSSE from "./hooks/useSSE";
import useMessages from "./hooks/useMessages";
import useChats from "./hooks/useChats";
import useSearchQuery from "./hooks/useSearchQuery";
import useScrollChat from "./hooks/useScrollChat";
import useToastNotification from "./hooks/useToastNotification";

import {FaUser} from "react-icons/fa";
import {FaGear, FaMagnifyingGlass} from "react-icons/fa6";
import {CiCircleCheck, CiCirclePlus} from "react-icons/ci";
import {IoSend} from "react-icons/io5";
import { MdDelete } from "react-icons/md";
import {BiEdit} from "react-icons/bi";
import {BiRefresh} from "react-icons/bi";

import {modalContext} from "./context/modalContext";

import ModalManager from "./components/ModalManager";
import Chat from "./components/Chat";
import Message from "./components/Message";
import ToastNotification from "./components/ToastNotification";

import {EMessageType, EModalType} from "./types/enums";
import {API_URL} from "./constants";

type TAppProps = {
    clientId: string;
}

function App({clientId}: TAppProps) {

    const messageInputRef = useRef<HTMLInputElement>(null);

    const [searchQuery, handleSearchQueryChange] = useSearchQuery();

    const {
        chats,
        handleNewChat,
        handleUpdateChat,
        handleDeleteChat,
        currentChat,
        setCurrentChat,
        loadChats
    } = useChats(clientId, searchQuery);
    const [messages, handleNewMessage, handleUpdateMessage] = useMessages(chats);
    const scrollChatRef = useScrollChat(messages);
    const [toastNotificationData, isToastNotificationShown, showToastNotification] = useToastNotification();

    const {showModal} = useContext(modalContext);

    const SSEHandler = useCallback((message: TMessage) => {
        if (currentChat?._id !== message.chatId) {
            showToastNotification(message);
        }
        handleNewMessage(message);
    }, [currentChat])

    useSSE(clientId, SSEHandler);

    const handleSendMessage = useCallback(() => {

        if (messageInputRef.current) {
            const value = messageInputRef.current.value;

            if (value === '') return;

            fetch(API_URL + '/messages', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    clientId,
                    text: value,
                    chatId: currentChat?._id
                })
            }).then(res => res.json()).then(data => {
                handleNewMessage(data);
            }).catch(err => {
                console.log(err);
            });

            if (currentChat)
                fetch(API_URL + `/auto-response/${currentChat._id}/${clientId}`, {
                    method: 'GET'
                })

            messageInputRef.current.value = '';
        }
    }, [currentChat]);

    return (
        <main className={"App w-screen h-screen overflow-hidden flex"}>
            <div className={'w-1/3 h-full border-r border-gray-400 flex flex-col min-h-0 min-w-0'}>
                <div className={'bg-mediumGray p-3 border-b border-gray-400'}>
                    <div className={"flex justify-between items-start mb-5"}>
                        <div className={"relative"}>
                            <FaUser className={'text-5xl aspect-square bg-white rounded-full p-1 relative'}/>
                            <CiCircleCheck className={'absolute -bottom-1 -right-1 text-m text-green-500 z-10'}/>
                        </div>
                        <button
                            className={'rounded-lg text-blue-400 text-l px-1 border border-gray-300 bg-white font-semibold'}>Log
                            in
                        </button>
                    </div>
                    <div
                        className={'w-full rounded-full border border-gray-300 bg-lightGray p-2 flex items-center justify-center'}>
                        <FaMagnifyingGlass className={'text-xl text-gray-500'}/>
                        <input onChange={handleSearchQueryChange} type="text" className={'text-xl w-full bg-transparent focus:outline-none px-2'}
                               placeholder={'Search of start new chat'}/>
                    </div>
                </div>
                <div className={'flex justify-between items-center'}>
                    <h1 className={'ml-3 my-3 text-2xl text-blue-400'}>Chats</h1>
                    <BiRefresh className={'text-4xl text-gray-700 cursor-pointer'} onClick={loadChats}/>
                </div>
                <div className={'grow overflow-x-auto'}>
                    {!chats.length && <p className={'text-3xl text-center w-full'}>Try refresh chats list.</p>}
                    {chats.map(chat => {
                        const messagesReverse = messages.slice().reverse();
                        const lastMessage = messagesReverse.find(msg => msg.chatId === chat._id);

                        return <Chat key={chat._id} chat={chat} lastMessage={lastMessage} handleClick={() => {
                            if (currentChat?._id !== chat._id)
                                setCurrentChat(chat);
                        }}/>
                    })}
                    {
                        searchQuery.split(' ').length >= 2
                        &&
                        <div onClick={() => {
                                showModal(EModalType.CREATE_CHAT, {
                                    defaultQuery: searchQuery,
                                    handleSubmit: handleNewChat,
                                })
                        }}
                             className={'flex p-5 items-center gap-3 border-b border-gray-400 cursor-pointer'}>
                            <CiCirclePlus className={'flex-shrink-0 text-5xl text-gray-800'}/>
                            <p className={'text-2xl text-gray-600 truncate'}>Start new chat : '{searchQuery.split(' ', 2).join(' ')}'</p>
                        </div>
                    }
                </div>
            </div>
            {
                currentChat
                &&
                <div className={'w-2/3 flex min-h-0 flex-col'}>
                    <div className={'bg-mediumGray border-b border-gray-300 px-3 flex items-center justify-start py-2'}>
                        <div className={"relative w-fit h-fit"}>
                            <img src={currentChat.botAvatarUrl} alt="" className={"aspect-square h-16 rounded-full"}/>
                            <CiCircleCheck className={'absolute -bottom-1 -right-1 text-m text-green-500 z-10'}/>
                        </div>
                        <h1 className={'text-xl font-bold text-gray-700'}>{currentChat.botName} {currentChat.botSurName}</h1>
                        <FaGear onClick={() => {
                            showModal(EModalType.UPDATE_CHAT, {
                                currentChat,
                                handleSubmit: handleUpdateChat,
                            })
                        }} className={'cursor-pointer ml-auto text-2xl text-gray-800'}/>
                        <MdDelete onClick={() => {
                            showModal(EModalType.DELETE_CHAT, {
                                handleSubmit: () => {
                                    handleDeleteChat(currentChat._id);
                                    setCurrentChat(null);
                                },
                            })
                        }} className={'cursor-pointer mx-5 flex-shrink-0 text-3xl text-red-600'}/>

                    </div>
                    <div className={'h-full flex flex-col border-red-500 w-full bg-lightGray min-h-0'}>
                        <div ref={scrollChatRef}
                             onLoad={(e) => {
                                e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
                             }}
                             className={'grow bg-lightGray overflow-y-auto p-5 flex flex-col gap-6'}>
                            {messages.filter((message: TMessage) => message.chatId === currentChat._id).map((message: TMessage) => {
                                const messageType = message.clientId === '0' ? EMessageType.BOT_MESSAGE : EMessageType.OWN_MESSAGE;

                                return messageType === EMessageType.BOT_MESSAGE ?
                                    <div key={message._id} className={'flex gap-3 items-start'}>
                                        <img src={currentChat.botAvatarUrl} alt=""
                                             className={"aspect-square h-14 rounded-full"}/>
                                        <Message message={message} messageType={messageType}/>
                                    </div>
                                    :
                                    <div className={'ml-auto'} key={message._id}>
                                        <BiEdit onClick={() => {
                                            showModal(EModalType.UPDATE_MESSAGE, {
                                                defaultText: message.text,
                                                handleSubmit: (newText: string) => {
                                                    handleUpdateMessage(message._id, newText);
                                                }
                                            })
                                        }} className={'ml-auto text-lg'}/>
                                        <Message  message={message} messageType={messageType}/>
                                    </div>
                            })}
                        </div>
                        <div className={'bg-mediumGray border-t border-gray-300 p-3 flex-shrink-0'}>
                            <div
                                className={'w-full rounded-xl border border-gray-300 bg-lightGray p-2 flex items-center justify-center'}>
                                <input ref={messageInputRef}
                                       onKeyDown={({key}) => {
                                           if (key === 'Enter')
                                               handleSendMessage()
                                       }
                                       }
                                       type="text" className={'text-xl w-full bg-transparent focus:outline-none px-2'}
                                       placeholder={'Type your message'}/>
                                <IoSend onClick={handleSendMessage} className={'text-xl text-gray-500 cursor-pointer'}/>
                            </div>
                        </div>
                    </div>
                </div>
            }

            <ModalManager/>
            <ToastNotification data={toastNotificationData} isShown={isToastNotificationShown}/>
        </main>
    );
}

export default App;
