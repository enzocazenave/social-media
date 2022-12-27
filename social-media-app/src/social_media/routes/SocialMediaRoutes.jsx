import { Navigate, Route, Routes } from 'react-router-dom';
import { HomePage, ProfilePage } from '../pages/';

export const SocialMediaRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={ <HomePage /> } />
            <Route path="/:username" element={ <ProfilePage /> } />
            <Route path="/*" element={ <Navigate to="/" /> } />
        </Routes>
    );
}