import {authActions} from "./auth/actions";
import {contactsActions} from "./contacts/actions";

export const actions = {
    ...authActions,
    ...contactsActions
}


// type ActionsType = ReturnType<actions>