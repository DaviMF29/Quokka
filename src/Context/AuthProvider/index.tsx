import {createContext, useEffect, useState} from "react"
import { IAuthProvider, IContext, IUser, userId } from "./types"
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util"
import { api } from "../../services/api"



export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children } : IAuthProvider) => {
    const [ user, setUser ] = useState<IUser | null>()
    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [followers, setFollowers] = useState<userId[]>([])
    const [following, setFollowing] = useState<userId[]>([])

    

    useEffect(() => {
        const user = getUserLocalStorage()
        
        if(user){
            setUser(user)
            
        }
        
    }, [])

    
    async function authenticate(email: string, password: string) {
        const response = await LoginRequest(email, password)

        const payload = {access_token: response.access_token}

        setUser(payload)
        setUserLocalStorage(payload)

        
    }

    async function getUserInfo(token:string) {
        const config = {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          };
        const response = await api.get('/api/data_user',config)

        setUserId(response.data._id)
        setUsername(response.data.username)
        setEmail(response.data.email)
        setFollowers(response.data.followers)
        setFollowing(response.data.following)

        
    }

    
    

    function logout(){
        setUser(null)
        setUserLocalStorage(null)
        setUserId('')
        setEmail('')
        setUsername('')
        setFollowers([])
        setFollowing([])
    }



    return(
        <AuthContext.Provider value={{...user,userId,username,email,following,followers, authenticate, logout, getUserInfo}}>
            {children}
        </AuthContext.Provider>
    )
}