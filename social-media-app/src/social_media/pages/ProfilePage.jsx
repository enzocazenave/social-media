import { useParams } from 'react-router-dom';

export const ProfilePage = () => {

    const { username }  = useParams();

    return (
        <div>ProfilePage: { username }</div>
    );
}