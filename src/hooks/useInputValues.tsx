import React, {useCallback, useEffect, useState} from 'react';


// Custom hook for mapping each chat current text input, works but slows input to much, don't know how to fix for this moment.

const UseInputValues = (inputRef: React.RefObject<HTMLInputElement>, currentChatId: string ='default') => {

    const [values, setValues] = useState<Record<string, string>>({
        'default': '',
    });

    const [outputValue, setOutputValue] = useState<string>('');

    const handleChange = useCallback(() => {
        setValues((prev) => ({
            ...prev,
            [currentChatId]: inputRef.current? inputRef.current.value : '',
        }))
    }, [currentChatId]);

    const clearInput = useCallback(() => {
        setValues((prev) => ({
            ...prev,
            [currentChatId]: '',
        }))
    }, [currentChatId]);

    useEffect(() => {
        setOutputValue(values[currentChatId] || '');
    }, [currentChatId, values]);

    return [outputValue, handleChange, clearInput] as const;
};

export default UseInputValues;