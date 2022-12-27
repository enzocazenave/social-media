import { useContext } from 'react'
import api from '../api/api';
import { AuthContext } from '../context/AuthContext';

export const useAuthContext = () => {
    const { user, status, errorMessage, setUser, setStatus, setErrorMessage } = useContext(AuthContext);
    
    const login = async(credentials) => {
        const { user: email_username, password } = credentials;

        if (email_username.length === 0) return setErrorMessage('El correo electrónico o nombre de usuario es obligatorio.');
        if (password.length < 6) return setErrorMessage('La contraseña debe tener 6 o más caractéres.');
        console.log()

        setStatus('checking');

        try {
            const { data } = await api.post('/auth/login', credentials);
            delete data.ok;

            window.localStorage.setItem('@social_media:token', data.token);

            setUser(data);
            setStatus('authenticated');
            setErrorMessage('');
        } catch(error) {
            console.log(error.response.data.msg);
            logout(error.response.data.msg);
        }
    }

    const register = async(credentials) => {
        const { username, email, name, surname, password } = credentials;

        if (username.length === 0) return setErrorMessage('El nombre de usuario es obligatorio.');
        if (email.length === 0) return setErrorMessage('El correo electrónico es obligatorio.');
        if (name.length === 0) return setErrorMessage('El nombre es obligatorio.');
        if (surname.length === 0) return setErrorMessage('El apellido es obligatorio.');
        if (password.length < 6) return setErrorMessage('La contraseña debe tener 6 o más caractéres.');

        setStatus('checking');

        try {
            const { data } = await api.post('/auth/register', credentials);
            delete data.ok;

            window.localStorage.setItem('@social_media:token', data.token);

            setUser(data);
            setStatus('authenticated');
            setErrorMessage('');
        } catch(error) {
            logout(error.response.data.msg);
        }
    }

    const logout = async(message = '') => {
        window.localStorage.removeItem('@social_media:token');
        console.log('logo')
        setUser({});
        setStatus('not-authenticated');
        setErrorMessage(message);
    }

    return {
        //* Propiedades
        user,
        status,
        errorMessage,

        //* Métodos
        login,
        register,
        logout
    }
}
