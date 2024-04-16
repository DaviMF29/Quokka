
import { Dialog } from "@radix-ui/themes"
import { Header } from "../../components/Header"
import { Post, PostProps } from "../../components/Post"
import { SideProfile } from "../../components/SideProfile"
import { useAuth } from "../../hooks/useAuth"
import { CreateNewPostDiv, HomeContainer, OpenCreateNewPostButton, Posts, Wrapper } from "./styles"
import { NewPostModal } from "../../components/NewPostModal"
import { Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { api } from "../../services/api"



export function Home() {
    
    const user = useAuth()

    const [username, setUsername] = useState<string>('')
    const [email, setEmail] = useState<string>('')
    const [userId, setUserId] = useState<string>('')
    const [followers, setFollowers] = useState<number>(0)
    const [following, setFollowing] = useState<number>(0)

    const [posts, setPosts] = useState<PostProps[]>([])
    


    async function callUserInformations() {
        if(user.access_token){
           const userInfo = await user.getUserInfo(user.access_token)
           setUserId(userInfo._id)
           setUsername(userInfo.username)
           setEmail(userInfo.email)
           setFollowers(userInfo.followers.lenght)
           setFollowing(userInfo.following.lenght)
           
           
        }
    }

    async function callPostList(){
        const postList = await api.get('api/posts')
        setPosts(postList.data)
    }

    useEffect(() => {
        callPostList(),
        callUserInformations()
    }, [])

    
        

    async function handleDeletePost(postId:string, userId:string){
        const postIndex = posts.findIndex(post => post._id == postId)

        if(postIndex !== -1){
            const post = posts[postIndex]

            if(post.userId === userId){
                const url = `/api/posts/${postId}`
                api.delete(url, {
                    data: {userId}
                })
            }
        }


    }
    
    

    return(
        <Wrapper>
            <Header />
            <HomeContainer>
                <SideProfile
                    username={username}
                    email={email}
                    followers={followers}
                    following={following}
                />

                <Posts>
                    {posts.map(posts => {
                        return(
                                                    
                            <Post 
                                key={posts._id}
                                username={posts.username}
                                userId={posts.userId}
                                createdAt={posts.createdAt}
                                text={posts.text}   
                                _id={posts._id}
                                deletePostFunction={handleDeletePost}
                                currentUserId={userId}
                            />

                         )
                    })}
                </Posts>
                
            </HomeContainer>
            <CreateNewPostDiv>  
                <Dialog.Root>
                    <Dialog.Trigger>
                        <OpenCreateNewPostButton><Plus size={20}/></OpenCreateNewPostButton>
                    </Dialog.Trigger>
                    <NewPostModal />
                </Dialog.Root>
            </CreateNewPostDiv>
        </Wrapper>
        
        
            
        
        
    )
}