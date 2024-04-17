import { Avatar } from "../SideProfile/styles";
import { Author, AuthorInfo, CommentButton, CommentForm, CommentList, DeleteButton, PostContainer, PostContent } from "./styles";
import authorImg from '../../assets/profilepic.png'
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Trash, User } from "phosphor-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DropDownPost } from "./components/DropDownMenu";
import avatarImg2 from '../../assets/avatar_img2.avif'



/*const createCommentFormSchema = z.object({
    content: z.string().nonempty('Campo obrigatório!'),
})

type CreateCommentFormData = z.infer<typeof createCommentFormSchema>*/

export interface PostProps {
    _id: string
    username: string
    userId: string
    text: string
    createdAt: string
    isCode?: boolean
    currentUserId: string
    deletePostFunction: (postId:string, userId:string) => void
    setPostState: React.Dispatch<React.SetStateAction<boolean>>;
    

}

export const dateFormatter = new Intl.DateTimeFormat('pt-BR')

export function Post({ _id,username, userId, text, createdAt, currentUserId, deletePostFunction, setPostState}:PostProps) {

    

    /*const {
        register, 
        handleSubmit, 
        formState: {errors},
        watch,
        reset,
        } =  useForm<CreateCommentFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    const commentFieldChange = watch('content')*/
    
    function handleDeletePost(){
        deletePostFunction(_id, currentUserId)
    }

    
    
    const isAuthor = currentUserId === userId


    
    
    return(
        <PostContainer>
            <header>
                <Author>
                   <Avatar
                   src={avatarImg2}>
                        
                    </Avatar> 
                   <AuthorInfo>
                        <strong>{username}</strong>
                        <span>{userId}</span>
                   </AuthorInfo>

                </Author>
                
                

                { isAuthor && <DropDownPost
                                 _id={_id} 
                                 currentUserId={currentUserId} 
                                 deleteFunction={handleDeletePost}
                                 setPostState={setPostState}
                                 text={text}
                                 />
                }


                
                
            </header>

            
            <PostContent>
                {text}
            </PostContent>

            {/*<CommentForm onSubmit={handleSubmit(addNewComment)}>
                <textarea 

                placeholder="Escreva um comentário" 
                {...register('content')}
                />
                <CommentButton type="submit" disabled={!commentFieldChange}> Comentar </CommentButton>
            </CommentForm>

            <CommentList>
                {comments.map((comment: string) => {
                        return (
                        <Comments 
                            content={comment}
                            
                        />)
                    })}
                </CommentList>*/}

        
        </PostContainer>

    )
}