import api from '../api/api';

export const getUserByUsername = async(username) => {
    try {
        const { data } = await api.get(`/user/${username}`);
        delete data.ok;

        return data;
    } catch(error) {
        return error.response.data.msg;
    }
}