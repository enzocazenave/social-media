import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../../../helpers';
import { FirstProfileSection, SecondProfileSection, ThirdProfileSection } from '../../components';

export const UserProfilePage = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});
    const [ready, setReady] = useState(false);

    useEffect(() => {
        getUserByUsername(username).then(res => {
            setUser(res);
            setReady(true);
        });
    }, []);
    
    if (!ready) return (
        <h1>Cargando...</h1>
    )

    return (
        <div className="container">
            <FirstProfileSection user={ user } isMine />
            <SecondProfileSection />
            <ThirdProfileSection isMine />
        </div>
    )
}