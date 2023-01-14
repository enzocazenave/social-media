import { useLocation } from 'react-router-dom';
import api from '../api/api';
import { useAuthContext } from './useAuthContext';

const defaultProfileImage = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

export const usePosts = () => {
    const { user } = useAuthContext();
    const { pathname } = useLocation();
    
    const uploadPost = async({ url, title }) => {
        if (!url) return { ok: false };

        try {
            const { data } = await api.post('/post', {
                username: user.username,
                title,
                image: url
            });

            if (!data.ok) return { ok: false };

            if (pathname === `/${ user.username }`) {
                window.location.href = window.location.href;
            }

            return { ok: true };
        } catch(error) {
            return { ok: false };
        }
    }

    const getPostById = async(id) => {
        console.log('usePosts')
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

    const likePostById = async(id) => {
        try {
            await api.post(`/post/${ id }/like`, { username: user.username });
        } catch(error) {
            return error.response.data.msg;
        }
    }

    const commentPostById = async(id, comment) => {
        try {
            const { data } = await api.post(`/post/${ id }/comment`, {
                comment,
                user: {
                    username: user.username,
                    image: user.image || defaultProfileImage
                }
            });

            return data;
        } catch(error) {
            return error.response.data.msg;
        }
    }
    
    return {
        //* MÉTODOS
        uploadPost,
        getPostById,
        getAllPostsByUsername,
        likePostById,
        commentPostById

        //* PROPIEDADES
    }
}
