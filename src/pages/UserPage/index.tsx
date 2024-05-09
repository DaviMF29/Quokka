import { useParams } from "react-router-dom"
import { useAuth } from "../../hooks/useAuth"
import { useEffect, useState } from "react"
import { api } from "../../services/api"
import { Post, PostProps } from "../../components/Post"
import { Header } from "../../components/Header"
import { Profile } from "../Profile"
import { Button } from "@radix-ui/themes"
import { Tabs } from "phosphor-react"
import { ProfileWrapper, Banner, ProfileInfo, ProfilePicture, ProfileText, FollowButton, StyledTabTrigger, StyledBox, StyledTabsContent, UserPosts, UnfollowButton } from "./styles"
import avatarImg from '../../assets/avatar_img.png'
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
    
    
    async function getUserByUsername() {
        const response = await api.get(`/api/users/${userName}`)
        setPageOwner(response.data)
    }

    

        useEffect(() => {
            getUserByUsername()
            user.getUserInfo(user.access_token ?? '')
        }, [userName])

    
        async function handleFollow() {

            const config = {
                headers: {
                  Authorization: `Bearer ${user.access_token}` 
                },
                data: {
                    userId : user.userId,
                    followingId: pageOwner?._id
                }
              };
            await api.post("/api/users/following",config)
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