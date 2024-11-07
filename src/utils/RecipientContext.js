import React, { createContext, useContext, useState } from 'react';

const RecipientContext = createContext();

export function RecipientProvider({ children }) {
    const [recipient, setRecipient] = useState('');

    return (
        <RecipientContext.Provider value={{ recipient, setRecipient }}>
            {children}
        </RecipientContext.Provider>
    );
}

export function useRecipient() {
    return useContext(RecipientContext);
}
