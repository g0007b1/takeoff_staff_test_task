import {contactActionsTypes} from "./types";

const initialState = {
    contacts: []
}
type initialStateType = typeof initialState

export const ContactsReducer = (state: initialStateType = initialState, action: any) => {
    switch (action.type) {
        case contactActionsTypes.SET_CONTACTS: {
            return {...state, contacts: action.contacts}
        }
        default:
            return state
    }

}