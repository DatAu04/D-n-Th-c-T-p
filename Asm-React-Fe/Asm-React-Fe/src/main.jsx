import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import GlobalStyles from './Component/GlobalStyles/index.jsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <GlobalStyles>
                <App />
            </GlobalStyles>

            <ToastContainer />
        </QueryClientProvider>
    </React.StrictMode>,
);
