import {AuthServiceProps} from "../@types/auth-service";

import {BASE_URL} from "../config.ts";
import axios from "axios";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

export function useAuthService(): AuthServiceProps{

    const navigate = useNavigate()
    const getInitialLoggedInValue = () => {
        const loggedIn = localStorage.getItem("isLoggedIn")
        return loggedIn !== null && loggedIn === "true"
    }
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>((getInitialLoggedInValue))


    const getUserDetails = async () => {

        try {
            const user_id = localStorage.getItem("user_id")

            const response = await axios.get(BASE_URL+ `/account/?user_id=${user_id}`,
                {
                    withCredentials:true
                }
            )

            const userDetails = response.data
            localStorage.setItem("username", userDetails.username)
            setIsLoggedIn(true)
            localStorage.setItem("isLoggedIn", "true")

        } catch (err: any){
            setIsLoggedIn(false)
            localStorage.setItem("isLoggedIn", "false")
            return err
        }

    }

    const login = async (username: string, password: string) => {

        try {
            const response = await axios.post(BASE_URL+ '/token/', {
                    username, password,
                }, {withCredentials: true}
            )


            //console.log(response.data)

            const user_id = response.data.user_id
            console.log(user_id)
            localStorage.setItem("isLoggedIn", "true")
            localStorage.setItem("user_id", user_id)
            setIsLoggedIn(true)
            await getUserDetails()

        } catch (err: any){
            return err.response.status
        }

    }

    const logout = async () => {

        localStorage.setItem("isLoggedIn", "false")
        localStorage.removeItem("user_id")
        localStorage.removeItem("username")
        setIsLoggedIn(false)
        navigate("/login")


        try {
            await axios.post(
                `${BASE_URL}/logout/`, {}, {withCredentials:true}
            )
        } catch (refreshError){
            return Promise.reject(refreshError)
        }
    }
    return {login, isLoggedIn, logout}

}
