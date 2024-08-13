import React, {useCallback} from 'react';
import {EModalType} from "../types/enums";

export type TModalContext = {
    showModal: (modalType: EModalType, modalProps?: object) => void;
    hideModal: () => void;
    modalType: EModalType | null;
    modalProps: object;
}

export const modalContext = React.createContext<TModalContext>({
    showModal: (modalType: EModalType, modalProps?: object) => {return;},
    hideModal: () => {return;},
    modalType: null,
    modalProps: {}
});

const ModalContextProvider = ({children}: {children : React.ReactNode | React.ReactNode[]}) => {
    const [modalType, setModalType] = React.useState<EModalType | null>(null);
    const [modalProps, setModalProps] = React.useState<object>({});

    const showModal = useCallback((type: EModalType, props = {}) => {
        setModalType(type);
        setModalProps(props);
    }, []);

    const hideModal = useCallback(() => {
        setModalType(null);
        setModalProps({});
    }, [])

    return (
        <modalContext.Provider value={{modalType, modalProps, showModal, hideModal}}>
            {children}
        </modalContext.Provider>
    );
};

export default ModalContextProvider;