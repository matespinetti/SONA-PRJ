import {AuthServiceProps} from "../@types/auth-service";
import useCrud from "../hooks/useCrud.ts";
import {BASE_URL} from "../config.ts";
import axios from "axios";



export function useAuthService(): AuthServiceProps{

    const login = async (username: string, password: string) => {

        try {
            const response = await axios.post(BASE_URL+ '/token/', {
                    username, password,
                }
            )

            console.log(response)
        } catch (err: any){
            return err
        }

    }
    return {login}

}
