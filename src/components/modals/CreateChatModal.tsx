import React from 'react';
import {CgClose} from "react-icons/cg";
import { MdOutlineCreateNewFolder } from "react-icons/md";

type TCreateChatModalProps = {
    defaultQuery?: string,
    handleSubmit?: (data: {
        botName: string,
        botSurName: string,
    }) => void;
    handleClose: () => void,
};

const CreateChatModal = ({defaultQuery = '', handleSubmit, handleClose}: TCreateChatModalProps) => {
    const [defaultName, defaultSurname] = defaultQuery?.split(' ', 2);

    return (
        <div className={'fixed w-1/3 py-5 px-5 bg-mediumGray border rounded-xl flex flex-col'}>
            <div className={'flex justify-between mb-3'}>
                <h1 className={'font-bold text-4xl'}>Creating chat</h1>
                <CgClose onClick={handleClose} className={'text-3xl cursor-pointer'}/>
            </div>
            <form onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();

                const form = e.currentTarget;
                const formData = new FormData(form);
                const botNewName = formData.get('botNewName') as string;
                const botNewSurname = formData.get('botNewSurname') as string;

                const data = {
                    botName: botNewName,
                    botSurName: botNewSurname,
                }

                if (handleSubmit) {
                    handleSubmit(data);
                    handleClose();
                }
            }}>
                <label className={'flex flex-col font-semibold text-2xl text-gray-800 gap-2 mb-4'}>
                    Name
                    <input type="text"
                           required
                           name={'botNewName'}
                           defaultValue={defaultName}
                           className={'text-lg text-black px-2 py-1 font-normal border rounded-l border-gray-800'}
                           placeholder={'Edit name'}/>
                </label>
                <label className={'flex flex-col font-semibold text-2xl text-gray-800 gap-2 mb-4'}>
                    Surname
                    <input type="text"
                           required
                           name={'botNewSurname'}
                           defaultValue={defaultSurname}
                           className={'text-lg text-black px-2 py-1 font-normal border rounded-l border-gray-800'}/>
                </label>
                <button type={'submit'}
                        className={'w-full border bg-darkGray text-gray-50 text-4xl p-2 flex items-center justify-center gap-3'}>
                    Create
                    <MdOutlineCreateNewFolder className={'mt-2'}/>
                </button>
            </form>
        </div>
    );
};

export default CreateChatModal;