import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../../../helpers';
import { FirstProfileSection } from '../../components';

export const UsersProfilePage = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserByUsername(username).then(res => setUser(res));
    }, []);
    
    return (
        <div className="container">
            <FirstProfileSection user={ user } />
        </div>
    )
}