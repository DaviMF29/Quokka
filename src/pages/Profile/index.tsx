import { Button, Tabs } from "@radix-ui/themes";
import { Header } from "../../components/Header";
import { useAuth } from "../../hooks/useAuth";
import { Banner, ProfileInfo, ProfilePicture, ProfileText, ProfileWrapper, StyledBox, StyledTabTrigger, StyledTabsContent } from "./styles";
import '@radix-ui/themes/styles.css';
import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Post, PostProps } from "../../components/Post";
import profileImg from '../../assets/avatar_img.png'
import { api } from "../../services/api";

const createEditFormSchema = z.object({
    username: z.string(),
})

type CreateEditFormData = z.infer<typeof createEditFormSchema>



export function Profile() {

    const user = useAuth()
    const [postsLoaded, setPostsLoaded] = useState(false);
    const [favoritePosts, setFavoritePosts] = useState<PostProps[]>([])
    const [likedPosts, setLikedPosts] = useState<string[]>([])
    const [myPosts, setMyPosts] = useState<PostProps[]>([])
    
    

    
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        watch,
        reset,
        } =  useForm<CreateEditFormData>({
        resolver: zodResolver(createEditFormSchema)
    })

    useEffect(() => {
        const fetchData = async () => {
            if (user.access_token) {
                const postsId = await user.getFavoritePostsId(user.access_token);
                const postsPromises = postsId.map((postId: string) => user.getPostById(postId));
                const resolvedPosts = await Promise.all(postsPromises);
                

                const userPosts = await user.getUserPosts(user.access_token, user.userId ?? '');
                const userPostsPromises = userPosts.map((postId: string) => user.getPostById(postId));
                const resolvedUserPosts = await Promise.all(userPostsPromises);
                console.log(userPosts)
                setMyPosts(resolvedUserPosts);
                setFavoritePosts(resolvedPosts);
                setPostsLoaded(true);
            }
        }
        fetchData();
    }, [postsLoaded]);

    useEffect(() => {
        const fetchData = async () => {
            if(user.access_token){
               user.getUserInfo(user.access_token) 
               callLikedPostsList()
            }
        }

        fetchData()
        setPostsLoaded(true)
    }, [user.username, user.following])

    async function handleEditProfile(data: CreateEditFormData){
        if(user.access_token && user.userId){
            await user.updateUserInfo(user.access_token,user.userId,data.username)
            await user.getUserInfo(user.access_token)
        }

    }

    async function callLikedPostsList(){
        if(user.access_token){
            const postsId = await user.getLikedPosts(user.access_token)
            setLikedPosts(postsId)
        }
    }

    async function handleDeletePost(postId:string, userId:string){
        const postIndex = myPosts.findIndex(post => post._id == postId)

        if(postIndex !== -1){
            const post = myPosts[postIndex]

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
        <>
            <Header />
            <ProfileWrapper>
                <Banner src="https://i.pinimg.com/originals/0b/a3/d6/0ba3d60362c7e6d256cfc1f37156bad9.jpg"></Banner>
                <ProfileInfo>
                   <ProfilePicture src={profileImg}></ProfilePicture>
                   <ProfileText>
                    <h1>{user?.username ? user.username : 'user not found'}</h1> 
                    <h3>{user?.email ? user.email : 'email not found'}</h3>

                    { <div>
                        <p>Posts: {myPosts.length}</p>
                        <p>Posts favoritados: {favoritePosts.length}</p>
                        <p>Seguidores: {user.followers?.length}</p>
                        <p>Seguindo: {user.following?.length}</p>
                    </div> }
                    
                    
                    
                    
                   </ProfileText>
                </ProfileInfo>

                
                    <Tabs.Root defaultValue="account">
                        <Tabs.List color="cyan">
                            <StyledTabTrigger value="publications">Minhas Publicações</StyledTabTrigger>
                            <StyledTabTrigger value="favoritePosts">Post Favoritos</StyledTabTrigger>
                            <StyledTabTrigger value="account">Account</StyledTabTrigger>
                            <StyledTabTrigger value="settings">Settings</StyledTabTrigger>
                        </Tabs.List>

                        <StyledBox pt="3" >
                            <StyledTabsContent value="publications">
                                {myPosts.length === 0 ? (
                                    <p>Não existem postagens</p>
                                ) : (
                                    myPosts.map(post => (
                                        <Post 
                                            key={post._id}
                                            username={post.username}
                                            userId={post.userId}
                                            createdAt={post.createdAt}
                                            text={post.text}
                                            _id={post._id}
                                            setPostState={setPostsLoaded}
                                            currentUserId={user.userId ?? ''}
                                            userLikedPosts={likedPosts}
                                            deletePostFunction={handleDeletePost}
                                            commentField={false}
                                        />
                                    )).reverse()
                                )}
                                

                                
                            </StyledTabsContent>
                            <StyledTabsContent value="favoritePosts">
                                
                            {favoritePosts.length === 0 ? (
                                <p>Não existem posts favoritados</p>
                            ) : (
                                favoritePosts.map(post => (
                                    <Post 
                                        key={post._id}
                                        username={post.username}
                                        userId={post.userId}
                                        createdAt={post.createdAt}
                                        text={post.text}
                                        _id={post._id}
                                        setPostState={setPostsLoaded}
                                        userFollowing={user.following?.map(userId => userId.toString())}
                                        currentUserId={user.userId ?? ''}
                                        userLikedPosts={likedPosts}
                                        userFavoritePosts={favoritePosts.map(post => post._id)} 
                                        setPostAsFavorite={(postId, userId) => user.setPostAsFavorite(user.access_token??'', postId, userId)}
                                        commentField={false}
                                    />
                                )).reverse()
                            )}
                            </StyledTabsContent>

                            <StyledTabsContent value="account">
                                <form style={{display:'flex',flexDirection:'column'}} onSubmit={handleSubmit(handleEditProfile)}>
                                    <div>
                                        <label htmlFor="username">Username:</label>
                                        <input type="text" id="username" defaultValue={user.username} {...register('username')}/>
                                    </div>
                                    <div>
                                        <label htmlFor="age">Data de nascimento: </label>
                                        <input type="date" id="age" />
                                    </div>
                                    <div>
                                        <label htmlFor="image">Imagem de perfil:</label>
                                        <input type="file" id="image" />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email: </label>
                                        <input type="text" id="email" value={user.email} disabled/>
                                    </div>
                                    
                                    

                                    <Button type="submit">Save</Button>
                                </form>
                            </StyledTabsContent>

                            

                            <StyledTabsContent value="settings">
                                <p>settings content</p>
                            </StyledTabsContent>
                        </StyledBox>
                    </Tabs.Root>
                

                
                      
            </ProfileWrapper>


        </>
    )
}