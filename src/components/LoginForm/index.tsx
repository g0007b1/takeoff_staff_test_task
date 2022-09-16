import {useForm} from "react-hook-form";
import {FC, useEffect, useState} from "react";
import {Box, Button, Checkbox, Container, FormControlLabel, TextField, Typography} from "@mui/material";
import {useActions} from "../../hooks/useActions";
import {loginDataType} from "../../utils/types/AuthTypes";
import {useSelector} from "react-redux";
import {RootState} from "../../store";

export const LoginForm: FC = () => {
    const {register, handleSubmit} = useForm<loginDataType>()
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)
    const {login} = useActions()
    const errorMessage = useSelector((state: RootState) => state.AuthReducer.loginError)
    console.log(errorMessage)

    useEffect(() => {
        if (errorMessage)
            setError(true)
    }, [errorMessage])

    const onSubmit = handleSubmit((data) => {
        setLoading(true)
        login(data)
        setLoading(false)
    })

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
                    <Typography component="h1" variant="h5">Войти</Typography>
                    <Box component="form" noValidate sx={{mt: 1}} onSubmit={onSubmit}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            autoComplete="email"
                            autoFocus
                            label={'Email'}
                            error={error}
                            {...register('email')}
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
                        <FormControlLabel
                            control={<Checkbox value="remember" color="primary" />}
                            label="Запомнить меня"
                            {...register('rememberMe')}
                        />
                        {errorMessage ? <Typography color={'red'}>{errorMessage}</Typography> : <></>}
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