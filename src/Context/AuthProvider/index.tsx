import {createContext, useEffect, useState} from "react"
import { IAuthProvider, IContext, IUser, userId } from "./types"
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util"
import { api } from "../../services/api"



export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children } : IAuthProvider) => {
    const [ user, setUser ] = useState<IUser | null>()
    const [username, setUsername] = useState<string>('')
    const [profilePicture, setProfilePicture] = useState<string>('')
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

    async function updateUserInfo(token:string, userId:string, username?: string, profileImage?: string) {
        const config = {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          };
        const response = await api.put(`/api/users/${userId}`,{username},config)

        setUsername(response.data.username)
        
    }

    async function setPostAsFavorite(token:string,postId:string,userId:string) {
        const data = {
            userId : userId,
            postId : postId,
        }	
        const config = {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          };
        const response = await api.put(`/api/users/favorite`,data,config)
        
        
    }

    async function getFavoritePostsId(token:string) {
        const config = {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          };
        const response = await api.get('/api/users/favorite/posts',config)
        return response.data
    }
       
    async function getPostById(postId:string) {
        
        const response = await api.get(`/api/posts/${postId}`)
        return response.data
    }

    async function addComment(token:string,previousPostId:string,text:string, userId:string, username:string) {
        const data = {
            previousPostId : previousPostId,
            text : text,
            userId : userId,
            username: username,
        }	
        const config = {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          };
        const response = await api.put("/api/posts/comment",data,config)
        return response.data
      
    }
    

    async function addLike(token:string,postId:string) {

      
    }

    async function getPostLikes(postID:string) {
      
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
        <AuthContext.Provider value={{
            ...user,
            userId,
            username,
            email,
            following,
            followers,
            authenticate,
            logout, 
            getUserInfo, 
            updateUserInfo,
            setPostAsFavorite,
            getFavoritePostsId,
            getPostById, 
            addComment
            }}>
            {children}
        </AuthContext.Provider>
    )
}