import {createContext, useEffect, useState} from "react"
import { IAuthProvider, IContext, IUser } from "./types"
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util"
import { api } from "../../services/api"



export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children } : IAuthProvider) => {
    const [ user, setUser ] = useState<IUser | null>()
   

    

    useEffect(() => {
        const user = getUserLocalStorage()
        
        if(user){
            setUser(user)
            
        }
        
    }, [])

    
    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password)

        const payload = {access_token: response.access_token, email}

        setUser(payload)
        setUserLocalStorage(payload)

        
    }

    async function getUserInfo(token:string) {
        const config = {
            headers: {
              Authorization: `Bearer ${token}` // Prefixo 'Bearer' seguido pelo token
            }
          };
        const response = await api.get('/api/data_user',config)

        return response.data
    }

    


    function logout(){

        setUser(null)
        setUserLocalStorage(null)

    }



    return(
        <AuthContext.Provider value={{...user, authenticate, logout, getUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}