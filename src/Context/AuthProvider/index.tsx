import {createContext, useEffect, useState} from "react"
import { IAuthProvider, IContext, IUser, userId } from "./types"
import { LoginRequest, getUserLocalStorage, setUserLocalStorage } from "./util"
import { api } from "../../services/api"



export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ children } : IAuthProvider) => {
    const [ user, setUser ] = useState<IUser | null>()
    const [username, setUsername] = useState<string>('')
    //const [profilePicture, setProfilePicture] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [followers, setFollowers] = useState<userId[]>([])
    const [following, setFollowing] = useState<userId[]>([])
    const [likedPosts, setLikedPosts] = useState<string[]>([])
    

    

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
        setLikedPosts(response.data.liked_posts)

        
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
    

    async function addLike(token:string,postId:string, userId:string) {
        const data = {
            postId : postId,
        }	
        const config = {
            headers: {
              Authorization: `Bearer ${token}` 
            }
          };
        const response = await api.put(`/api/posts/like/${userId}`,data,config)
        return response.data
      
    }

    async function followUser(token:string, userId:string, followingId:string) {
        const data = {
          userId : userId,
          followingId : followingId,
      }	
      const config = {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        };

        const response = await api.put("/api/users/following",data,config)
    }

    async function getPostLikes(postID:string) {
        const response = await api.get(`/api/posts/likes/${postID}`)
        return response.data
      
    }

    async function getLikedPosts(token:string) {
        const config = {
          headers: {
            Authorization: `Bearer ${token}` 
          }
        };
        const response = await api.get(`/api/users/liked_posts`,config)
        setLikedPosts(response.data)
        return response.data
      
    }

    async function getUserPosts(token:string, userId:string) {
      const config = {
        headers: {
          Authorization: `Bearer ${token}` 
        },
        data : {
          userId : userId
        }
      };
      const response = await api.get(`/api/users/posts`,config)
      setLikedPosts(response.data)
      return response.data
    
  }
    

    function logout(){
        setUser(null)
        setUserLocalStorage(null)
        setUserId('')
        setEmail('')
        setUsername('')
        setFollowers([])
        setFollowing([])
        setLikedPosts([])
    }



    return(
        <AuthContext.Provider value={{
            ...user,
            userId,
            username,
            email,
            following,
            followers,
            likedPosts,
            authenticate,
            logout, 
            getUserInfo, 
            updateUserInfo,
            setPostAsFavorite,
            getFavoritePostsId,
            getUserPosts,
            getLikedPosts,
            getPostById,
            getPostLikes,
            addLike,
            addComment,
            followUser,
            }}>
            {children}
        </AuthContext.Provider>
    )
}