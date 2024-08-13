import React, {useEffect, useState} from 'react';
import {API_URL} from "../constants";

const UseSse = (clientId: string, onMessageHandler: (message: TMessage) => void) => {

    const [es, setEs] = useState<EventSource | null>(null);

    useEffect(() => {
        if (es) {
            es.onmessage = ({data} : any) => {
                onMessageHandler(JSON.parse(data));
            };
        }
    }, [onMessageHandler]);

    useEffect(() => {
        const es = new EventSource(API_URL + '/' + clientId);

        setEs(es);

        return () => {
            es.close();
        };
    }, [])

    return ;
};

export default UseSse;