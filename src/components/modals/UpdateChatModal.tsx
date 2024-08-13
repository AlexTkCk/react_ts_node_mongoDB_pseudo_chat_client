import React from 'react';
import {CgClose} from "react-icons/cg";
import {BiSave} from "react-icons/bi";

type TUpdateChatModalProps = {
    currentChat?: TChat;
    handleSubmit?: (
        chatId: string,
        update: Record<string, string>
    ) => void;
    handleClose: () => void,
};

const UpdateChatModal = ({currentChat, handleSubmit, handleClose}: TUpdateChatModalProps) => {
    return (
        <div className={'fixed w-1/3 py-5 px-5 bg-mediumGray border rounded-xl flex flex-col'}>
            <div className={'flex justify-between mb-3'}>
                <h1 className={'font-bold text-4xl'}>Editing chat</h1>
                <CgClose onClick={handleClose} className={'text-3xl cursor-pointer'} />
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();

                const form = e.currentTarget;
                const formData = new FormData(form);
                const botNewName = formData.get('botNewName') as string;
                const botNewSurname = formData.get('botNewSurname') as string;

                const update = {
                    botName: botNewName,
                    botSurName: botNewSurname,
                };

                if (currentChat && handleSubmit) {
                    handleSubmit(currentChat._id, update);
                    handleClose();
                }
            }}>
                <label className={'flex flex-col font-semibold text-2xl text-gray-800 gap-2 mb-4'}>
                    Name
                    <input type="text"
                           required
                           name={'botNewName'}
                           className={'text-lg text-black px-2 py-1 font-normal border rounded-l border-gray-800'}
                           placeholder={'Edit name'} defaultValue={currentChat?.botName}/>
                </label>
                <label className={'flex flex-col font-semibold text-2xl text-gray-800 gap-2 mb-4'}>
                    Surname
                    <input type="text"
                           required
                           name={'botNewSurname'}
                           className={'text-lg text-black px-2 py-1 font-normal border rounded-l border-gray-800'}
                           defaultValue={currentChat?.botSurName}/>
                </label>
                <button type={'submit'} className={'w-full border bg-darkGray text-gray-50 text-4xl p-2 flex items-center justify-center gap-3'}>
                    Save
                    <BiSave className={'mt-2'}/>
                </button>
            </form>
        </div>
    );
};

export default UpdateChatModal;