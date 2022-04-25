import React from 'react';
import {IndexRouteProps, LayoutRouteProps, PathRouteProps, Route, Routes} from 'react-router-dom';
import {useAuthState} from '../auth';
import {LoginPage} from '../pages/LoginPage';
import {Homepage} from '../pages/Homepage';
import {NavigationBar} from './common/NavigationBar';
import {AllEquipmentPage} from '../pages/AllEquipmentPage';
import {IndividualEquipmentPage} from '../pages/IndividualEquipmentPage';

export const AppRoutes: React.FC< PathRouteProps | LayoutRouteProps | IndexRouteProps> = (props) => {
    const authState = useAuthState();

    if (!authState.token) {
        return (
            <Routes>
                <Route
                    index
                    element={<LoginPage/>}
                />
            </Routes>
        )
    }
    return (
        <>
            <NavigationBar />
            <Routes>
                <Route
                    path={'/login'}
                    element={<LoginPage/>}
                />
                <Route
                    index
                    element={<Homepage/>}
                />
                <Route
                    path={'/equipment'}
                    element={<AllEquipmentPage />}
                />

                <Route
                    path={'/equipment/:equipmentId'}
                    element={<IndividualEquipmentPage />}
                />
            </Routes>
        </>
    )
}
