import { zodResolver } from "@hookform/resolvers/zod";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { BookmarksSimple, ThumbsUp } from "phosphor-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import avatarImg2 from '../../assets/avatar_img2.avif';
import { useAuth } from "../../hooks/useAuth";
import { api } from "../../services/api";
import { Comments } from "../Comment";
import { Avatar } from "../SideProfile/styles";
import { DropDownPost } from "./components/DropDownMenu";
import { Author, AuthorInfo, CommentButton, CommentForm, CommentList, FavoriteButton, FollowButton, InfoWrapper, LikeButton, LinkDiv, PostContainer, PostContent, PostFooter, UnfavoriteButton, UnfollowButton, UnlikeButton } from "./styles";





 const createCommentFormSchema = z.object({
     content: z.string().nonempty('Campo obrigatório!'),
 })

 type CreateCommentFormData = z.infer<typeof createCommentFormSchema>

export interface PostProps {
    _id: string
    username: string
    userId: string
    text: string
    createdAt: Date
    isCode?: boolean
    currentUserId: string
    userFavoritePosts?: string[]
    userLikedPosts?: string[]
    userFollowing?: string[]
    commentField?: boolean
    deletePostFunction?: (postId:string, userId:string) => void
    setPostState: React.Dispatch<React.SetStateAction<boolean>>
    setPostAsFavorite?: (postId: string, userId: string) => void
    setPostAsLiked?: (postId: string, userId: string) => void
}



export function Post({ _id,username, userId, text, createdAt, currentUserId,userFavoritePosts, userLikedPosts,userFollowing,commentField,deletePostFunction, setPostState, setPostAsFavorite, setPostAsLiked}:PostProps) {

    const user = useAuth()
    const [comment, setComment] = useState<CreateCommentFormData[]>([])
    const [commentList, setCommentList] = useState<string[]>([])
    const [localPostState, setLocalPostState] = useState<boolean>(false)
    const [numberOfLikes, setNumberOfLikes] = useState<number>(0)
    
    
    
    
   
     const {
         register, 
         handleSubmit,
         watch,
         reset,
         } =  useForm<CreateCommentFormData>({
         resolver: zodResolver(createCommentFormSchema)
     })

    const commentFieldChange = watch('content')
    
    function handleDeletePost(){
        if(deletePostFunction){
          deletePostFunction(_id, currentUserId)  
        }
        
    }
    
    async function handleFollowUser() {
        if(user.access_token && user.userId){
            await user.followUser(user.access_token, user.userId, userId)
            setLocalPostState(false)
            setPostState(false)
            user.getUserInfo(user.access_token ?? '')
        }
    }
    

    async function handleSetPostAsFavorite(){
        if(setPostAsFavorite){
            await setPostAsFavorite(_id, currentUserId);
            setPostState(false);
            
        }
    }


    async function getNumberOfLikesInPost() {
       const response = await api.get(`/api/posts/likes/${_id}`)
       setNumberOfLikes(response.data.likes)
       
    }

    async function getCommentsOfPost() {
        const response = await api.get(`/api/posts/comments/${_id}`)
        setCommentList(response.data.comments)
    }
    
    useEffect(() => {
        getNumberOfLikesInPost()
        getCommentsOfPost()
    }, [])


    useEffect(() => {
        setLocalPostState(true)
        setPostState(true)
    }, [localPostState])

    
    
    async function handleSetPostAsLiked() {
         const config = {
             headers: {
                 Authorization: `Bearer ${user.access_token}` 
             }
         };
    
         const data = {
             postId: _id
         }
         await api.post(`/api/users/like`, data, config);
         getNumberOfLikesInPost()
         setPostState(false);
        
     }
    
    const isAuthor = currentUserId === userId

    const publishedDateRelativeToNow = formatDistanceToNow(createdAt,{
        locale:ptBR,
        addSuffix: true
    })

     async function addNewComment(data: CreateCommentFormData) {
         
         if (user.access_token && user.userId && user.username) { 
             await user.addComment(user.access_token,_id, data.content, user.userId, user.username);
         }
         setComment(prevComments => [...prevComments, data]);
         setPostState(false)
         reset()
         getCommentsOfPost()
     }
     
     async function handleDeleteComment(commentId: string, postId: string) {
        console.log(commentId)
        await api.delete(`/api/comments/${commentId}`, { data: { postId: postId } });
        getCommentsOfPost()
        setPostState(false);
    }
    
    
    

    return(
        <PostContainer>
            <header>
                <Author>
                    <InfoWrapper>
                        <LinkDiv to={`/${username}`}>
                            <Avatar
                            src={avatarImg2}>
                                
                            </Avatar> 
                            <AuthorInfo>
                                <strong>{username}</strong>
                                <time>
                                    {publishedDateRelativeToNow} 
                                </time>
                            </AuthorInfo>
                        </LinkDiv>
                        
                        {!isAuthor &&(
                            <>
                                {(userFollowing ?? []).includes(userId) ? (
                                    <UnfollowButton onClick={handleFollowUser}>Seguindo</UnfollowButton>
                                ) : (
                                    <FollowButton onClick={handleFollowUser}>Seguir</FollowButton>
                                )}
                            
                            </>
                        )}
                        

                        
                        
                    </InfoWrapper>
                   

                    {!isAuthor && (
                        <>
                            {(userFavoritePosts ?? []).includes(_id) ? (
                                <UnfavoriteButton onClick={handleSetPostAsFavorite}>
                                    <BookmarksSimple size={18}/>
                                </UnfavoriteButton>
                            ) : (
                                <FavoriteButton onClick={handleSetPostAsFavorite}>
                                    <BookmarksSimple size={18}/>
                                </FavoriteButton>
                            )}
                        </>
                    )}
                    
                    

                    { isAuthor && <DropDownPost
                        _id={_id} 
                        currentUserId={currentUserId} 
                        deleteFunction={handleDeletePost}
                        setPostState={setPostState || (() => {})}
                        text={text}
                    />
                    }
                </Author>
            </header>
            
            
            <PostContent>
                 {text.split('<br>').map((line, index) => (
                    <React.Fragment key={index}>
                    {line}
                    {index !== text.split('<br>').length - 1 && <br />}
                    </React.Fragment>
                ))} 
                
            </PostContent>

            {commentField && (
                <>
                    <CommentForm onSubmit={handleSubmit(addNewComment)}>
                        <textarea 
                            placeholder="Escreva um comentário" 
                            {...register('content')}
                        />
                        <CommentButton type="submit" hidden={!commentFieldChange}> Comentar </CommentButton>
                    </CommentForm>

                    <CommentList>
                        {commentList.map((comment) => {
                            return (
                                <Comments 
                                    key={comment}
                                    commentId = {comment}
                                    setPostState = {setPostState}
                                    handleDeleteComment={handleDeleteComment}
                                />
                            );
                        })}
                    </CommentList>
                </>
            )}

            
            

            <PostFooter>
                {(userLikedPosts ?? []).includes(_id) ? (
                                <UnlikeButton onClick={handleSetPostAsLiked}><ThumbsUp size={24} weight="fill"/> Like</UnlikeButton> 
                            ) : (
                                <LikeButton  onClick={handleSetPostAsLiked}><ThumbsUp size={24} weight="fill"/> Like</LikeButton> 
                            )}




               
               <p>{numberOfLikes}</p>
               {/* {commentField && 
                <CommentSection postId={_id}                      
                />} */}
            </PostFooter>
            

        
        </PostContainer>

    )
}