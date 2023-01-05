import { useState } from 'react';
import api from '../api/api';
import { uploadImage } from '../helpers';
import { useAuthContext } from './useAuthContext';

export const usePosts = () => {

    const [isLoading, setIsLoading] = useState(false);
    const { user } = useAuthContext();
    
    const uploadPost = async({ url, title }) => {
        if (!url) return { ok: false };
        setIsLoading(true);

        try {
            const { data } = await api.post('/post', {
                username: user.username,
                title,
                image: url
            });

        } catch(error) {
            return { ok: false };
        }


        setIsLoading(false);
    }
    
    return {
        //* MÉTODOS
        uploadPost,

        //* PROPIEDADES
        isLoading
    }
}
