import React from 'react';
import CreateChatModal from "./modals/CreateChatModal";
import UpdateChatModal from "./modals/UpdateChatModal";
import DeleteChatModal from "./modals/DeleteChatModal";
import UpdateMessageModal from "./modals/UpdateMessageModal";
import useModal from "../hooks/useModal";
import {EModalType} from "../types/enums";

const MODAL_COMPONENTS = {
    [EModalType.CREATE_CHAT]: CreateChatModal,
    [EModalType.UPDATE_CHAT]: UpdateChatModal,
    [EModalType.DELETE_CHAT]: DeleteChatModal,
    [EModalType.UPDATE_MESSAGE]: UpdateMessageModal,
}

const ModalManager = () => {

    const {modalType, modalProps, hideModal} = useModal();

    if (!modalType) {
        return <></>;
    }

    const ModalComponent = MODAL_COMPONENTS[modalType];

    return (
        <div className={'absolute h-full w-full top-0 left-0 grid place-items-center'}>
            <div onClick={hideModal} className={'h-full w-full absolute top-0 left-0 bg-black opacity-50'}></div>
            <ModalComponent {...modalProps} handleClose={hideModal}/>
        </div>
    );
};

export default ModalManager;