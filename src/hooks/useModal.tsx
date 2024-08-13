import React, {useContext} from 'react';
import {modalContext, TModalContext} from "../context/modalContext";

const UseModal = () => {
    return useContext<TModalContext>(modalContext);
};

export default UseModal;