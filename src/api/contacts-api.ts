import {instance} from "./api";
import {AxiosResponse} from "axios";
import {contactsDataType} from "../utils/types/ContactsTypes";

export const contactsApi = {
    getContacts(owner:string) {
        return instance.get(`/contacts/${owner}`).then((response: AxiosResponse) => {
            console.log(response.data)
            return response.data
        })
    },
    patchContact(owner: string, contacts: contactsDataType) {
        return instance.patch(`/contacts/${owner}`, {
            contacts
        })
    },
}