import React, {createContext, Dispatch, useContext, useReducer} from 'react';
import {Action, AuthReducer, AuthorisationState, initialState} from './reducer';

const AuthStateContext = createContext<AuthorisationState|undefined>(undefined);
const AuthDispatchContext = createContext<Dispatch<Action>|undefined>(undefined);

export const useAuthState = () => {
    const context = useContext(AuthStateContext);
    if (context === undefined) {
        throw new Error("useAuthState must be used within a AuthProvider");
    }
    return context;
}

export const useAuthDispatch = () => {
    const context = useContext(AuthDispatchContext);
    if (context === undefined) {
        throw new Error("useAuthDispatch must be used within a AuthProvider");
    }
    return context;
}

export const AuthProvider = ({
    children
}: any) => {
    const [user, dispatch] = useReducer(AuthReducer, initialState);
    return (
        <AuthStateContext.Provider value={user}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
};
