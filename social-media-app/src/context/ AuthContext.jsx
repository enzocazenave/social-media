import { createContext, useState } from 'react';

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [status, setStatus] = useState('not-authenticated');
    const [errorMessage, setErrorMessage] = useState('');
    
    return (
        <AuthContext.Provider
            value={{
                user,
                status,
                errorMessage,
                setUser,
                setStatus,
                setErrorMessage
            }}
        >
            { children }
        </AuthContext.Provider>
    );
}