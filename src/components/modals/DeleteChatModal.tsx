import React from 'react';
import {CgClose} from "react-icons/cg";

type TDeleteChatModalProps = {
    handleSubmit?: () => void;
    handleClose: () => void,
};

const DeleteChatModal = ({handleSubmit, handleClose}: TDeleteChatModalProps) => {
    return (
        <div className={'fixed w-1/4 py-5 px-5 bg-mediumGray border rounded-xl flex flex-col'}>
            <div className={'flex'}>
                <h1 className={'font-bold text-4xl'}>Deleting chat <span className={'text-red-800'}>!</span></h1>
                <CgClose onClick={handleClose} className={'text-3xl cursor-pointer ml-auto'}/>
            </div>
            <div className={'flex justify-between mt-7 gap-3'}>
                <button className={'w-1/2 border border-gray-800 text-3xl py-2 rounded-xl'} onClick={() => {
                    if (handleSubmit) {
                        handleSubmit();
                    }

                    handleClose();
                }}>Yes</button>
                <button className={'w-1/2 bg-gray-800 text-white text-3xl py-2 rounded-xl'} onClick={handleClose}>No</button>
            </div>
        </div>
    );
};

export default DeleteChatModal;