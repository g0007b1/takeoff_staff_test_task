import {contactActionsTypes} from "./types";
import {ThunkDispatch} from "redux-thunk";
import {RootState} from "../../index";
import {Action} from "redux";
import {contactsApi} from "../../../api/contacts-api";
import {contactsDataType} from "../../../utils/types/ContactsTypes";

export const contactsActions = {
    setContacts: (contacts: contactsDataType) => ({type: contactActionsTypes.SET_CONTACTS, contacts}),
    getContacts: (owner:string) => {
        return async (dispatch: ThunkDispatch<RootState, void, Action>) => {
            const contactsData = await contactsApi.getContacts(owner)
            console.log(contactsData.contacts)
            dispatch(contactsActions.setContacts(contactsData.contacts))
        }
    },
    patchContact: (contact: contactsDataType, owner:string) => {
        return async (dispatch:ThunkDispatch<RootState, void, Action>) => {
            await contactsApi.patchContact(owner,contact)
            await dispatch(contactsActions.getContacts(owner))
        }
    }
}