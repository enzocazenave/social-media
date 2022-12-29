import { useParams } from 'react-router-dom';
import { useAuthContext } from '../../../hooks/useAuthContext';
import { UserProfilePage } from './UserProfilePage';
import { UsersProfilePage } from './UsersProfilePage';

export const ProfilePage = () => {
    const { username } = useParams();
    const { user } = useAuthContext();
    const isYourProfile = username === user.username;

    if (isYourProfile) { 
        return <UserProfilePage />
    }

    return <UsersProfilePage />
}