import { Route, Routes } from 'react-router-dom';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { SocialMediaRoutes } from '../social_media/routes/SocialMediaRoutes';

export const AppRouter = () => {
    
    const status = 'authenticated';

    if (status === 'checking') return <h1>Cargando...</h1>;
    
    return (
        <Routes>
            {
                (status === 'authenticated')
                    ? <Route path="/*" element={ <SocialMediaRoutes /> } />
                    : <Route path="/*" element={ <AuthRoutes /> } />
            }
        </Routes>
    );
}