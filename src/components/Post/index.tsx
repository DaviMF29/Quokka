import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { number, z } from "zod";
import { Avatar } from "../SideProfile/styles";
import { Author, AuthorInfo, CommentButton, CommentForm, CommentList, FavoriteButton, InfoWrapper, LikeButton, PostContainer, PostContent, PostFooter, UnfavoriteButton, UnlikeButton } from "./styles";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import avatarImg2 from '../../assets/avatar_img2.avif';
import { Comments } from "../Comment";
import { DropDownPost } from "./components/DropDownMenu";
import { useEffect, useRef, useState } from "react";
import { BookmarksSimple, ThumbsUp } from "phosphor-react";
import { useAuth } from "../../hooks/useAuth";
import { CommentSection } from "./components/CommentSection";
import { Comment } from "../Comment/styles";
import { api } from "../../services/api";




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
    commentField?: boolean
    deletePostFunction?: (postId:string, userId:string) => void
    setPostState: React.Dispatch<React.SetStateAction<boolean>>
    setPostAsFavorite?: (postId: string, userId: string) => void
    setPostAsLiked?: (postId: string, userId: string) => void
}



export function Post({ _id,username, userId, text, createdAt, currentUserId,userFavoritePosts, userLikedPosts,commentField,deletePostFunction, setPostState, setPostAsFavorite, setPostAsLiked}:PostProps) {

    const user = useAuth()
    const [comments, setComments] = useState<CreateCommentFormData[]>([])
    
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

    useEffect(() => {
        getNumberOfLikesInPost()
    }, [numberOfLikes])

    
    
    async function handleSetPostAsLiked() {
         const config = {
             headers: {
                 Authorization: `Bearer ${user.access_token}` 
             }
         };
    
         const data = {
             postId: _id
         }
         await api.post(`/api/users/like/${currentUserId}`, data, config);
         getNumberOfLikesInPost()
         setPostState(false);
        
     }
    
    const isAuthor = currentUserId === userId

    const publishedDateRelativeToNow = formatDistanceToNow(createdAt,{
        locale:ptBR,
        addSuffix: true
    })

     async function addNewComment(data: CreateCommentFormData) {
         console.log('comentado:', data.content);
         if (user.access_token && user.userId && user.username) { 
             await user.addComment(user.access_token, _id, data.content, user.userId, user.username);
         }
         setComments(prevComments => [...prevComments, data]);
         reset()
     }
    
    


    return(
        <PostContainer>
            <header>
                <Author>
                    <InfoWrapper>
                        <Avatar
                        src={avatarImg2}>
                            
                        </Avatar> 
                        <AuthorInfo>
                            <strong>{username}</strong>
                            <time>
                                {publishedDateRelativeToNow}
                            </time>
                        </AuthorInfo>
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
                {text}
            </PostContent>

            {commentField && (
                <>
                    <CommentForm onSubmit={handleSubmit(addNewComment)}>
                        <textarea 
                            placeholder="Escreva um comentário" 
                            {...register('content')}
                        />
                        <CommentButton type="submit" disabled={!commentFieldChange}> Comentar </CommentButton>
                    </CommentForm>

                    <CommentList>
                        {comments.map((comment: CreateCommentFormData) => {
                            return (
                                <Comments 
                                    content={comment.content}
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