import React, {useCallback} from 'react';

const UseSearchQuery = () => {
    const [searchQuery, setSearchQuery] = React.useState('');

    const handleSearchQueryChange = useCallback(({currentTarget: {value}}:  React.ChangeEvent<HTMLInputElement>) => setSearchQuery(value), [])

    return [searchQuery, handleSearchQueryChange] as const;
};

export default UseSearchQuery;