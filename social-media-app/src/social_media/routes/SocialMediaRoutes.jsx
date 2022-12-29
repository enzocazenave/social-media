import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from '../components';
import { ExplorePage, HomePage, ProfilePage, ProfilePageSavedPosts } from '../pages/';

export const SocialMediaRoutes = () => {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={ <HomePage /> } />
                <Route path="/explore" element={ <ExplorePage /> } /> 
                <Route path="/:username" element={ <ProfilePage /> } />
                <Route path="/:username/saved" element={ <ProfilePageSavedPosts /> } />
                <Route path="/*" element={ <Navigate to="/" /> } />
            </Routes>
        </>
    );
}