import {useSelector} from "react-redux";
import {RootState} from "../../store";
import {RegistrationForm} from "../../components/RegistrationForm";
import {useState} from "react";
import {Box, Button, Container, Typography} from "@mui/material";
import {LoginForm} from "../../components/LoginForm";
import {Navigate} from "react-router-dom";
import {useActions} from "../../hooks/useActions";
//т.к. в ТЗ сказано, что страницы должно быть всего две, регистрация и логинизация происходит тут,
//так бы для этого создал отдельные руты /login /register
export const HomePage = () => {
    const email = localStorage.getItem('email');
    const password = localStorage.getItem('password');
    const {login} = useActions()
    if (email && password) {
        login({email, password, rememberMe: true});
    }

    const isAuth = useSelector((state: RootState) => state.AuthReducer.isAuth)
    const [loginMode, setLoginMode] = useState(false)
    const [registerMode, setRegisterMode] = useState(false)
    const loginModeHandler = () => {
        if (registerMode)
            setRegisterMode(false)
        setLoginMode(!loginMode)
    }
    const registerModeHandler = () => {
        if (loginMode)
            setLoginMode(false)
        setRegisterMode(!registerMode)
    }
    if (isAuth) {
        return (<Navigate to='/contacts'/>)
    }
    return (
        <Container component="div" maxWidth="xs">
            <Box sx={{
                display:"flex",
                flexDirection:"column",
                alignItems:"center",
                marginTop:20
            }}>
                <Typography component="h1" variant="h5">Привет! Тут ты можешь</Typography>
                <Button variant="text" onClick={loginModeHandler}>Войти</Button>
                <Typography component="h1" variant="h5">или</Typography>
                <Button variant="text" onClick={registerModeHandler}>Зарегистрироваться</Button>
                {loginMode ? <LoginForm/> : <></>}
                {registerMode ? <RegistrationForm/> : <></>}
                <Typography sx={{textAlign:"center"}} variant="subtitle2">Лень регистрироваться? Вот: izgagin1234567890@gmail.com, 123123</Typography>
            </Box>
        </Container>
    )
}