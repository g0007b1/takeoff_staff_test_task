export type loginDataType = {
    email: string,
    password: string,
    rememberMe: boolean
}

export type registrationDataType = {
    email: string,
    password: string,
    login: string
}

export type userLoginData = {
    accessToken: string,
    user: {
        email: string
        id: number
        login: string
        name: string
    }
}
