import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {Box, Button, Container, TextField, Typography} from "@mui/material";
import {registrationDataType} from "../../utils/types/AuthTypes";
import {useActions} from "../../hooks/useActions";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const RegistrationForm = () => {
    const {register, handleSubmit} = useForm<registrationDataType>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const errorMessage = useSelector((state: RootState) => state.AuthReducer.registerError)
    const success = useSelector((state: RootState) => state.AuthReducer.registerSuccess)
    useEffect(() => {
        if (errorMessage)
            setError(true)
        if (success)
            setError(false)
    }, [errorMessage, success])

    const {registerAc} = useActions()
    const onSubmit = handleSubmit((data) => {
            setLoading(true)
            console.log(data)
            registerAc(data)
            setLoading(false)
        }
    )
    if (loading) {
        return <div>lOADiNg</div>
    }

    return (
        <>
            <Container component="div" maxWidth="xs">
                <Box
                    sx={{
                        marginTop: 5,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Typography component="h1" variant="h5">Регистрация</Typography>
                    <Box component="form" onSubmit={onSubmit} noValidate sx={{mt: 1}}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="email"
                            autoFocus
                            error={error}
                            label={'Email'}
                            {...register('email')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="login"
                            autoFocus
                            error={error}
                            label={'Логин'}
                            {...register('login')}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            label="Пароль"
                            type="password"
                            id="password"
                            error={error}
                            {...register('password')}
                            autoComplete="current-password"
                        />
                        {error ? <Typography color={'red'}>{errorMessage}</Typography> : <></>}
                        {success ? <Typography color={'green'}>Регистрация успешна!</Typography> : <></>}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{mt: 3, mb: 2}}
                        >
                            Войти
                        </Button>
                    </Box>
                </Box>
            </Container>
        </>
    )
}