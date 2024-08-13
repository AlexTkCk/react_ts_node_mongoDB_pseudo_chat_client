import React, {useRef} from 'react';
import {CgClose} from "react-icons/cg";
import {BiSave} from "react-icons/bi";

type TUpdateMessageModalProps = {
    defaultText?: string;
    handleSubmit?: (newText: string) => void
    handleClose: () => void,
};


const UpdateMessageModal = ({defaultText, handleSubmit, handleClose}: TUpdateMessageModalProps) => {
    return (
        <div className={'fixed w-1/3 py-5 px-5 bg-mediumGray border rounded-xl flex flex-col min-h-0 h-1/3'}>
            <div className={'flex justify-between mb-3'}>
                <h1 className={'font-bold text-4xl'}>Editing message</h1>
                <CgClose onClick={handleClose} className={'text-3xl cursor-pointer'} />
            </div>
            <form className={'w-full grow min-h-0 flex flex-col gap-2'} onSubmit={e => {
                e.preventDefault();
                e.stopPropagation();

                const form = e.currentTarget;
                const formData = new FormData(form);
                const newText = formData.get('newText') as string;

                if (handleSubmit && newText !== defaultText) {
                    handleSubmit(newText);
                }
                handleClose();
            }}>
                <textarea name={'newText'} defaultValue={defaultText} required className={'rounded-lg grow w-full text-xl p-2 bg-gray-300'}/>
                <button type={'submit'} className={'w-full border bg-darkGray text-gray-50 text-4xl p-2 flex items-center justify-center gap-3'}>
                    Save
                    <BiSave className={'mt-2'}/>
                </button>
            </form>

        </div>
    );
};

export default UpdateMessageModal;