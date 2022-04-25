const userItem = localStorage.getItem("currentUser");
const tokenItem = localStorage.getItem("token");

let user: User = userItem
    ? JSON.parse(userItem).user
    : "";

export type User = {
    id: string,
    username: string,
}

export type AuthorisationState = {
    userDetails: User,
    token: string,
    loading: boolean,
    errorMessage: string | null,
}

export const initialState: AuthorisationState = {
    userDetails: "" || user,
    token: tokenItem ?? "",
    loading: false,
    errorMessage: null,
};

export type Action =
    | { type: ActionTypes.RequestLogin }
    | { type: ActionTypes.LoginSuccess, payload: {token: string}}
    | { type: ActionTypes.Logout}
    | { type: ActionTypes.LoginError, error: string};

export enum ActionTypes {
    RequestLogin,
    LoginSuccess,
    Logout,
    LoginError,
}

export const AuthReducer = (initialState: AuthorisationState, action: Action) => {
    switch (action.type) {
        case ActionTypes.RequestLogin:
            return {
                ...initialState,
                loading: true
            };
        case ActionTypes.LoginSuccess:
            return {
                ...initialState,
                token: action.payload.token,
                loading: false
            };
        case ActionTypes.Logout:
            return {
                ...initialState,
                user: "",
                token: ""
            };

        case ActionTypes.LoginError:
            return {
                ...initialState,
                loading: false,
                errorMessage: action.error
            };

        default:
            throw new Error(`Unhandled action type`);
    }
};
