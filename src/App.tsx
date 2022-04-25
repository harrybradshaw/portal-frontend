import React from 'react';
import './App.css';
import {BrowserRouter as Router} from "react-router-dom";
import {AuthProvider} from './auth';
import {AppRoutes} from './components/AppRoutes';

const App: React.FC = () => {
    return (
        <AuthProvider>
            <Router>
                <AppRoutes />
            </Router>
        </AuthProvider>
    );
}

export default App;
