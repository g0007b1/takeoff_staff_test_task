import {
    Avatar, Box,
    IconButton, Input, InputLabel,
    ListItem,
    ListItemAvatar,
    ListItemText, Typography
} from "@mui/material";
import {contactsDataType} from "../../../utils/types/ContactsTypes";
import {DeleteOutlineOutlined, EditOutlined} from "@mui/icons-material";
import {ChangeEvent, FC, useState} from "react";
import DoneIcon from '@mui/icons-material/Done';

type Props = {
    contact: contactsDataType,
    deleteContact: (contact: contactsDataType) => void,
    index: number,
    editContact: (index: number, newContact:contactsDataType) => void
}

export const Contact: FC<Props> = ({contact, deleteContact, index,editContact}) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [name, setName] = useState<string>(contact.name)
    const [phone, setPhone] = useState<string>(contact.phone)
    const deleteContactHandler = () => {
        deleteContact(contact)
    }
    const editModeHandler = () => {
        setEditMode(true)
    }

    const setNameInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(e.target.value)
    }

    const setPhoneInout = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(phone.length)
        const re = /^[+\d]?[\d-.\s()]*$/;
        if (re.test(e.target.value) && e.target.value.length <= 12) {
            setPhone(e.target.value)
        }
    }

    const sendEdit = () => {
        editContact(index, {name, phone: phone})
        setEditMode(false)
    }

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar>{contact.name[0].toUpperCase()}</Avatar>
            </ListItemAvatar>
            {editMode
                ?
                <Box sx={{display:"flex", flexDirection:"column"}}><InputLabel htmlFor="input">Имя</InputLabel>
                    <Input placeholder={contact.name} value={name} onChange={e => setNameInput(e)} id="input"/>
                    <InputLabel htmlFor="input2">Номер</InputLabel>
                    <Input placeholder={contact.phone.toString()} value={phone} onChange={e => setPhoneInout(e)}
                           id="input2"/></Box>
                :
                <ListItemText
                    primary={contact.name}
                    secondary={
                        <>
                            <Typography
                                sx={{display: 'inline'}}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {contact.phone}
                            </Typography>
                        </>
                    }
                />}

            {editMode ? <IconButton color={'primary'} onClick={sendEdit}>
                    <DoneIcon/>
                </IconButton> :
                <IconButton onClick={editModeHandler}>
                    <EditOutlined/>
                </IconButton>}
            <IconButton onClick={deleteContactHandler}>
                <DeleteOutlineOutlined/>
            </IconButton>
        </ListItem>
    )
}