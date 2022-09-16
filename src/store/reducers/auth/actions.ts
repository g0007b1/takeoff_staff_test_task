import {authActionsTypes} from "./types";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../index";
import {Action} from "redux";
import {authApi} from "../../../api/auth-api";
import {loginDataType, registrationDataType} from "../../../utils/types/AuthTypes";
import {contactsActions} from "../contacts/actions";

export const authActions = {
    setIsAuth: (login: string | null, isAuth: boolean) => ({type: authActionsTypes.SET_AUTH, login, isAuth}),
    login: (data: loginDataType) => {
        return async (dispatch: ThunkDispatch<RootState, void, Action>) => {
            if (data.rememberMe) {
                localStorage.setItem('email', data.email);
                localStorage.setItem('password', data.password);
            }
            const userData = await authApi.login(data)
            if (userData.user) {
                await dispatch(contactsActions.getContacts(userData.user.login))
                dispatch(authActions.setIsAuth(userData.user.login, true))
            } else {
                dispatch(authActions.setLoginError(userData.response.data))
            }
        }
    },
    signOut: () => {
        return async (dispatch: ThunkDispatch<RootState, void, Action>) => {
            localStorage.removeItem('email');
            localStorage.removeItem('password');
            dispatch(authActions.setIsAuth(null, false))
        }
    },
    setLoginError: (loginError: string) => ({type: authActionsTypes.SET_LOGIN_ERROR, loginError}),
    registerAc: (data: registrationDataType) => {
        return async (dispatch: ThunkDispatch<RootState, void, Action>) => {
            const responseData = await authApi.register(data)
            console.log(responseData)
            if (responseData) {
                if (responseData.email) {
                    dispatch(authActions.setRegisterSuccess(true))
                    setTimeout(() => {
                        dispatch(authActions.setRegisterSuccess(false))
                    }, 5000)

                } else {
                    dispatch(authActions.setRegisterError(responseData.response.data))
                }
            } else {
                dispatch(authActions.setRegisterError('Login is already exist'))
            }
        }
    },
    setRegisterSuccess: (succ: boolean) => ({type: authActionsTypes.SET_REGISTER_SUCCESS, succ}),
    setRegisterError: (registerError: string) => ({type: authActionsTypes.SET_REGISTER_ERROR, registerError}),
}