import React, {useCallback, useState} from 'react';

const useToastNotification = () =>  {
    const [data, setData] = useState<any>();
    const [isShown, setIsShown] = useState(false);

    const showToast = useCallback((data: any) => {
        setData(data);
        setIsShown(true);
        setTimeout(() => {
            setIsShown(false);
        }, 2000);
    }, []);

    return [data, isShown, showToast];
};

export default useToastNotification;