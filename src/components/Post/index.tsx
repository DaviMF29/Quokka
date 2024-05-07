import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar } from "../SideProfile/styles";
import { Author, AuthorInfo, CommentButton, CommentForm, CommentList, FavoriteButton, InfoWrapper, PostContainer, PostContent, UnfavoriteButton } from "./styles";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import avatarImg2 from '../../assets/avatar_img2.avif';
import { Comments } from "../Comment";
import { DropDownPost } from "./components/DropDownMenu";
import { useEffect, useRef, useState } from "react";
import { BookmarksSimple } from "phosphor-react";



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
    userFavoritePosts: string[]
    deletePostFunction: (postId:string, userId:string) => void
    setPostState: React.Dispatch<React.SetStateAction<boolean>>;
    setPostAsFavorite: (postId: string, userId: string) => void
}



export function Post({ _id,username, userId, text, createdAt, currentUserId,userFavoritePosts,deletePostFunction, setPostState, setPostAsFavorite}:PostProps) {

    const [comments, setComments] = useState<CreateCommentFormData[]>([])
    
    
   
    const {
        register, 
        handleSubmit, 
        formState: {errors},
        watch,
        reset,
        } =  useForm<CreateCommentFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    const commentFieldChange = watch('content')
    
    function handleDeletePost(){
        deletePostFunction(_id, currentUserId)
    }
    

    async function handleSetPostAsFavorite(){
        await setPostAsFavorite(_id, currentUserId)
        setPostState(false)
        
        
    }

    
    
    const isAuthor = currentUserId === userId
    
    
    const publishedDateRelativeToNow = formatDistanceToNow(createdAt,{
        locale:ptBR,
        addSuffix: true

    })

    function addNewComment(data: CreateCommentFormData) {
        console.log('comentado:', data.content);
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
                            {userFavoritePosts.includes(_id) ? (
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
                        setPostState={setPostState}
                        text={text}
                        />
                    }
                </Author>
                
                
                
                

               


                
                
            </header>
            
            
            <PostContent>
                {text}
            </PostContent>

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

        
        </PostContainer>

    )
}