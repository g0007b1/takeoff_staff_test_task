import {authActionsTypes} from "./types";

const initialState = {
    isAuth: false,
    login: null as string | null,
    loginError: null as string | null,
    registerError: null as string | null,
    registerSuccess: false
}
type initialStateType = typeof initialState

export const AuthReducer = (state: initialStateType = initialState, action: any) => {
    switch (action.type) {
        case authActionsTypes.SET_AUTH: {
            return {...state, isAuth: action.isAuth, login: action.login}
        }
        case authActionsTypes.SET_LOGIN_ERROR: {
            return {...state, loginError: action.loginError}
        }
        case authActionsTypes.SET_REGISTER_ERROR: {
            return {...state, registerError: action.registerError}
        }
        case authActionsTypes.SET_REGISTER_SUCCESS: {
            return {...state, registerSuccess: action.succ}
        }
        default:
            return state
    }
}