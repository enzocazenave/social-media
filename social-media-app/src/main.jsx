import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { UiProvider } from './context/UiContext';
import { AppRouter } from './router/AppRouter';
import { CreatePostModal } from './social_media/components/';
import './styles/global.css';

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <UiProvider>
            <BrowserRouter>
                <AppRouter />
                <CreatePostModal />
            </BrowserRouter>
        </UiProvider>
    </AuthProvider>
);