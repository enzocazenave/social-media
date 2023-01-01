import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserByUsername } from '../../../helpers';
import { FirstProfileSection, SecondProfileSection, ThirdProfileSection } from '../../components';

export const UsersProfilePage = () => {
    const { username } = useParams();
    const [user, setUser] = useState({});

    useEffect(() => {
        getUserByUsername(username).then(res => setUser(res));
    }, []);
    
    return (
        <div className="container">
            {
                (typeof user === 'string') 
                ? <h1 style={{ marginTop: '6rem' }}>{ user }</h1>
                : <>
                    <FirstProfileSection user={ user } />
                    <SecondProfileSection />
                    <ThirdProfileSection />
                </>
            }
            
        </div>
    )
}