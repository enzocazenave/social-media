import { useState } from 'react';
import api from '../api/api';
import { useAuthContext } from './useAuthContext';

export const usePosts = () => {
    const { user } = useAuthContext();
    
    const uploadPost = async({ url, title }) => {
        if (!url) return { ok: false };

        try {
            const { data } = await api.post('/post', {
                username: user.username,
                title,
                image: url
            });

            if (!data.ok) return { ok: false };

            return { ok: true };
        } catch(error) {
            return { ok: false };
        }
    }

    const getPostById = async(id) => {
        try {
            const { data } = await api.get(`/post/${ id }`);
            delete data.ok;
    
            return data;
        } catch(error) {
            return error.response.data.msg;
        }
    }

    const getAllPostsByUsername = async(username) => {
        try {
            const { data } = await api.get(`/posts/${ username }`);
            delete data.ok;
            
            return data.posts;
        } catch(error) {
            return error.response.data.msg;
        }
    }
    
    return {
        //* MÉTODOS
        uploadPost,
        getPostById,
        getAllPostsByUsername,

        //* PROPIEDADES
    }
}
