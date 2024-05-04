
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
    const [open, setOpen] = useState(false)

    const [posts, setPosts] = useState<PostProps[]>([])
    const [postsLoaded, setPostsLoaded] = useState(false);
    
    
    
    
    

    async function callPostList(){
        const postList = await api.get('api/posts')
        setPosts(postList.data.reverse())
        
    }

    useEffect(() => {
        const fetchData = async () => {
            if(user.access_token){
               user.getUserInfo(user.access_token) 
            }
        }

        fetchData()
    }, [])

   

    useEffect(() => {
        if (!postsLoaded) {
            callPostList();
            setPostsLoaded(true);
            }
    }, [postsLoaded]);

    
        

    async function handleDeletePost(postId:string, userId:string){
        const postIndex = posts.findIndex(post => post._id == postId)

        if(postIndex !== -1){
            const post = posts[postIndex]

            if(post.userId === userId){
                const url = `/api/posts/${postId}`
                const config = {
                    data: {userId},
                    headers: {
                        Authorization: `Bearer ${user.access_token}`
                    }
                }
                await api.delete(url, config)
                setPostsLoaded(false)

            }
        }
    }


    
    
    

    return(
        <Wrapper>
            <Header />
            <HomeContainer>
                <SideProfile
                    username={user.username }
                    email={user.email}
                    followers={user.followers }
                    following={user.following }
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
                                setPostState={setPostsLoaded}
                                currentUserId={user.userId ?? ''}
                                setPostAsFavorite={(postId, userId) => user.setPostAsFavorite(user.access_token??'', postId, userId)}
                                isFavorite={posts.isFavorite}
                            />

                         )
                    })}
                </Posts>
                
            </HomeContainer>
            <CreateNewPostDiv>  
                <Dialog.Root open={open} onOpenChange={setOpen}>
                    <Dialog.Trigger>
                        <OpenCreateNewPostButton><Plus size={20}/></OpenCreateNewPostButton>
                    </Dialog.Trigger>
                    <NewPostModal 
                        userId={user.userId ?? ''}
                        username={user.username ?? ''}
                        setPostState={setPostsLoaded}
                        setOpenState={setOpen}
                    />
                </Dialog.Root>
            </CreateNewPostDiv>
        </Wrapper>
        
        
            
        
        
    )
}