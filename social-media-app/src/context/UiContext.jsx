import { createContext, useState } from 'react';

export const UiContext = createContext({});

export const UiProvider = ({ children }) => {

    const [createPostModalIsOpen, setCreatePostModalIsOpen] = useState(false);

    return (
        <UiContext.Provider 
            value={{
                createPostModalIsOpen,
                setCreatePostModalIsOpen
            }}
        >
            { children }
        </UiContext.Provider>
    )
}