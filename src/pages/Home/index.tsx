
import { Box, Dialog, Tabs } from "@radix-ui/themes"
import { Plus } from "phosphor-react"
import { useEffect, useState } from "react"
import { Header } from "../../components/Header"
import { NewPostModal } from "../../components/NewPostModal"
import { Post, PostProps } from "../../components/Post"
import { SideProfile } from "../../components/SideProfile"
import { useAuth } from "../../hooks/useAuth"
import { api } from "../../services/api"
import { StyledTabTrigger } from "../Profile/styles"
import { CreateNewPostDiv, HomeContainer, NotPostList, OpenCreateNewPostButton, Posts, Wrapper } from "./styles"




export function Home() {
    
    const user = useAuth()
    const [open, setOpen] = useState(false)
    const [posts, setPosts] = useState<PostProps[]>([])
    const [followingPosts, setFollowingPosts] = useState<PostProps[]>([])
    const [postsLoaded, setPostsLoaded] = useState(false);
    const [favoritePosts, setFavoritePosts] = useState<string[]>([])
    const [likedPosts, setLikedPosts] = useState<string[]>([])
    

    


    async function callFavoritePostsList(){
        if(user.access_token){
            const postsId = await user.getFavoritePostsId(user.access_token)
            setFavoritePosts(postsId)
        }
    }

    async function callLikedPostsList(){
        if(user.access_token){
            const postsId = await user.getLikedPosts(user.access_token)
            setLikedPosts(postsId)
        }
    }

    async function callPostList(){
        const postList = await api.get('api/posts')
        setPosts(postList.data.reverse())
        
    }

    async function callFollowingPostList() {
        const config = {
            headers: {
              Authorization: `Bearer ${user.access_token}` 
            },
            data: {
                userId : user.userId
            }
          };
        const followingPostsId = await api.get('/api/users/following/posts',config)
        const followingPostPromises = followingPostsId.data.map((postId: string) => user.getPostById(postId))
        const postList = await Promise.all(followingPostPromises)
        
        setFollowingPosts(postList.reverse())
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
            callFavoritePostsList();
            callLikedPostsList();
            callFollowingPostList();
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
                <Tabs.Root defaultValue="allPosts">
                    <Tabs.List color="cyan" size='2'>
                        <StyledTabTrigger color='cyan'value="allPosts">Todos os posts</StyledTabTrigger>
                        <StyledTabTrigger value="following">Seguindo</StyledTabTrigger>
                        
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="allPosts">
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
                                        userFavoritePosts={favoritePosts}
                                        userFollowing={user.following?.map(userId => userId.toString())}
                                        userLikedPosts={likedPosts}
                                        setPostAsLiked={(postId: string,userId: string) => user.addLike(user.access_token??'', postId, userId)}
                                        commentField={true}
                                    />

                                )
                            })}
                </Posts>

                        
                        </Tabs.Content>

                        <Tabs.Content value="following">
                             {(followingPosts.length !== 0 ? followingPosts.map(posts => {
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
                                            userFollowing={user.following?.map(userId => userId.toString())}
                                            userFavoritePosts={favoritePosts}
                                            userLikedPosts={likedPosts}
                                            setPostAsLiked={(postId: string,userId: string) => user.addLike(user.access_token??'', postId, userId)}
                                            commentField={true}
                                        />

                                    )
                                }) 
                                :
                                
                                <NotPostList>
                                    Não existem Posts
                                </NotPostList>
                                
                            )} 

                                
                            
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>

                
                
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