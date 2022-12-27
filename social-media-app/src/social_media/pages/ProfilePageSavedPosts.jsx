import { useParams } from 'react-router-dom';

export const ProfilePageSavedPosts = () => {

    const { username } = useParams();

    return (
        <div>ProfilePageSavedPosts: { username }</div>
    );
}
