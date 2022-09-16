import {contactActionsTypes} from "./types";
import {AnyAction} from "redux";

const initialState = {
    contacts: []
}
type initialStateType = typeof initialState

export const ContactsReducer = (state: initialStateType = initialState, action: AnyAction) => {
    switch (action.type) {
        case contactActionsTypes.SET_CONTACTS: {
            return {...state, contacts: action.contacts}
        }
        default:
            return state
    }

}