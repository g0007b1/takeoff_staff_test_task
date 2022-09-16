import {instance} from "./api";
import {AxiosError, AxiosResponse} from "axios";
import {loginDataType, registrationDataType} from "../utils/types/AuthTypes";

export const authApi = {
    async login(data: loginDataType) {
        try {
            const response = await instance.post('/login', data)
            return response.data
        } catch (error) {
            return error as AxiosError
        }
    },
    async register(data: registrationDataType) {
        try {
            let alreadyExistLogin = false
            const users = await instance.get('/users').then((response:AxiosResponse) => response.data)
            users.map((user:registrationDataType) => {
                if (user.login === data.login)
                    alreadyExistLogin = true
                return true
            })
            if (!alreadyExistLogin) {
                const response = await instance.post('/users', data).then((response: AxiosResponse) => response.data)
                await instance.post('/contacts', {
                    "id": data.login,
                    "contacts": []
                })
                console.log(response)
                return response.user
            }
        } catch (error) {
            return error as AxiosError
        }
    }
}