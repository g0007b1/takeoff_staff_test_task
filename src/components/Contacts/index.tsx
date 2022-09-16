import {ChangeEvent, FC, useState} from "react";
import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {contactsDataType} from "../../utils/types/ContactsTypes";
import {Contact} from "./Contact";
import {Button, Container, IconButton, List} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {SearchBar} from "./SearchBar";
import {AddContactForm} from "./AddContactForm";
import {useActions} from "../../hooks/useActions";

export const Contacts: FC = () => {
    const contacts = useSelector((state: RootState) => state.ContactsReducer.contacts)
    const login = useSelector((state: RootState) => state.AuthReducer.login)
    const [searchValue, setSearchValue] = useState<string>("");
    const [addMode, setAddMode] = useState<boolean>(false)
    const {patchContact, signOut} = useActions()
    const signOutButton = () => {
        signOut()
    }
    const search = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
    }

    const deleteContact = (contact: contactsDataType) => {
        let newContacts = contacts.filter((c: contactsDataType) => {
            return !(c.phone === contact.phone && c.name === contact.name)

        })
        patchContact(newContacts, login as string)
    }

    const addContactHandler = (contact: contactsDataType) => {
        let newContacts = contacts
        newContacts.push(contact)
        patchContact(newContacts, login as string)
        setAddMode(false)
    }

    const addModeHandler = () => {
        setAddMode(!addMode)
    }

    const editContact = (index: number, newContact: contactsDataType) => {
        let newContacts = contacts
        newContacts[index] = newContact
        patchContact(newContacts, login as string)
    }

    const contactList = contacts.filter((contact: contactsDataType) => {
        return contact.name.toLowerCase().includes(searchValue.toLowerCase())
    }).map((contact: contactsDataType, index: number) => {
        return <Contact key={`${contact.name}${contact.phone}${index}`} contact={contact}
                        editContact={editContact} deleteContact={deleteContact} index={index}/>
    })

    return (
        <Container maxWidth="xs"
                   sx={{display: "flex", flexDirection: "column", alignItems: "center", marginTop: 20}}>
            <SearchBar value={searchValue} search={search}/>
            <List sx={{width: '100%', maxWidth: 360}}>{contactList}</List>
            {addMode ? <AddContactForm addContactHandler={addContactHandler}/> : <></>}
            <IconButton aria-label="fingerprint" color="primary" onClick={addModeHandler}>
                <AddCircleOutlineIcon/>
            </IconButton>
            <Button onClick={signOutButton} variant="text">Выйти</Button>
        </Container>
    )
}