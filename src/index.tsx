import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import ModalContextProvider from "./context/modalContext";

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

if (!localStorage.getItem('clientId')) {
    localStorage.setItem('clientId', crypto.randomUUID().toString());
}

const clientId = localStorage.getItem('clientId') as string;

root.render(
    <ModalContextProvider>
        <App clientId={clientId}/>
    </ModalContextProvider>
);

