import React, {useEffect, useRef} from 'react';

const UseScrollChat = <T, >(dep: T) => {

    const scrollChatRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollChatRef.current) {
            scrollChatRef.current.scrollTop = scrollChatRef.current.scrollHeight;
        }
    }, [dep]);

    return scrollChatRef;
};

export default UseScrollChat;