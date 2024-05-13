import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import avatarImg from '../../assets/avatar_img.png'
import { Header } from "../../components/Header"
import { PostProps } from "../../components/Post"
import { useAuth } from "../../hooks/useAuth"
import { api } from "../../services/api"
import { Banner, FollowButton, ProfileInfo, ProfilePicture, ProfileText, ProfileWrapper, UnfollowButton, UserPosts } from "./styles"
interface UserInfo {
    _id : string
    username: string
    email: string
    favorites: Array<string>
    followers: Array<string>
    following: Array<string>
    liked_posts:Array<string>
    posts: Array<PostProps>

}

export function UserPage({userId}: {userId: string}) {


    const user = useAuth()
    const {userName} = useParams()
    const [pageOwner, setPageOwner] = useState<UserInfo | null>(null)
    const [pageLoaded, setPageLoaded] = useState(false)
    
    async function getUserByUsername() {
        const response = await api.get(`/api/users/${userName}`)
        setPageOwner(response.data)
    }

    

        useEffect(() => {
            getUserByUsername()
            user.getUserInfo(user.access_token ?? '')
            setPageLoaded(true)
        }, [pageLoaded])


        

    
        async function handleFollow() {
            
            if(user.access_token && user.userId && pageOwner?._id){
               await user.followUser(user.access_token,user.userId,pageOwner?._id) 
               getUserByUsername()
               setPageLoaded(false)
               
            }
            
        }

        
        
        return (
            
                
        <>
            <Header />
            <ProfileWrapper>
                <Banner src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"></Banner>
                <ProfileInfo>
                   <ProfilePicture src={avatarImg}></ProfilePicture>
                   <ProfileText>
                    <h1>{pageOwner?.username ? pageOwner.username : 'user not found'}</h1> 
                    <h3>{pageOwner?.email ? pageOwner.email : 'email not found'}</h3>

                     <div>
                        <p>Id: {pageOwner?._id}</p>
                        <p>Posts: {pageOwner?.posts.length}</p>
                        <p>Posts favoritados: {pageOwner?.favorites.length}</p>
                        <p>Seguidores: {pageOwner?.followers?.length}</p>
                        <p>Seguindo: {pageOwner?.following?.length}</p>
                    </div> 
                    
                    {pageOwner && pageOwner._id !== userId && (
                    
                    (pageOwner.followers && pageOwner.followers.includes(userId)) ?
                        <UnfollowButton onClick={handleFollow}>Seguindo</UnfollowButton> : 
                        <FollowButton onClick={handleFollow}>Seguir</FollowButton> 
                )}
                    
                    
                   </ProfileText>
                </ProfileInfo>

                <UserPosts>
                    
                </UserPosts>
                      
            </ProfileWrapper>


        </>
    )
}