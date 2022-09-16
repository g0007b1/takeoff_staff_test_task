import {ChangeEvent, FC, useState} from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {contactsDataType} from "../../../utils/types/ContactsTypes";

type Props = {
    addContactHandler: (contact: contactsDataType) => void
}

export const AddContactForm:FC<Props> = ({addContactHandler}) => {
    const [titleError, setTitleError] = useState<boolean>(false);
    const [detailsError, setDetailsError] = useState<boolean>(false);
    const [phone, setPhone] = useState<string>('')
    const [name, setName] = useState<string>('')
    const setPhoneInout = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        console.log(phone.length)
        const re = /^[+\d]?[\d-.\s()]*$/;
        if (re.test(e.target.value) && e.target.value.length <= 12) {
            setPhone(e.target.value)
        }
    }
    const setNameInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        setName(e.target.value)
    }
    const onSubmit = () => {

        setTitleError(false);
        setDetailsError(false);

        if (name === "") {
            setTitleError(true);
        }

        if (phone.length === 0) {
            setDetailsError(true);
        }
        if (name && phone) {
            console.log('form')
            addContactHandler({name, phone})
        }
    }
    return (
        <Container component="div" maxWidth="xs">
            <Box sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Typography
                    variant="h6"
                    color="textSecondary"
                    component="h2"
                >
                    Добавить контакт
                </Typography>

                <Box component='form' sx={{mt: 1}}>
                    <TextField
                        label="Имя"
                        variant="outlined"
                        color="primary"
                        fullWidth
                        required
                        margin="normal"
                        error={titleError}
                        value={name}
                        onChange={e => setNameInput(e)}
                    />

                    <TextField
                        label="Номер телефона"
                        margin="normal"
                        multiline
                        variant="outlined"
                        color="primary"
                        fullWidth
                        required
                        error={detailsError}
                        type="number"
                        value={phone}
                        onChange={e => setPhoneInout(e)}
                    />

                    <Button
                        color="primary"
                        variant="contained"
                        fullWidth
                        onClick={onSubmit}
                    >
                        Добавить
                    </Button>
                </Box>
            </Box>
        </Container>
    )
}