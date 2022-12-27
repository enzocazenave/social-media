import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';

export const ProfilePage = () => {

    const { username }  = useParams();
    const { user } = useAuthContext();
    const isYourProfile = username === user.username;

    return (
        <div>ProfilePage: { (isYourProfile) ? 'Tu perfil' : username }</div>
    );
}