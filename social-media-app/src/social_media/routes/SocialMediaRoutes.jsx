import { Navigate, Route, Routes } from 'react-router-dom';
import { ExplorePage, HomePage, ProfilePage, ProfilePageSavedPosts } from '../pages/';

export const SocialMediaRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/explore" element={ <ExplorePage /> } /> 
            <Route path="/:username" element={ <ProfilePage /> } />
            <Route path="/:username/saved" element={ <ProfilePageSavedPosts /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
    );
}