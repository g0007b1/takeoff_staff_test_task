import {combineReducers} from "redux";
import {AuthReducer} from "./auth/AuthReducer";
import {ContactsReducer} from "./contacts/ContactsReducer";

export const rootReducer = combineReducers({AuthReducer, ContactsReducer})
