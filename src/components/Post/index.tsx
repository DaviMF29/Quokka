import { Avatar } from "../SideProfile/styles";
import { Author, AuthorInfo, CommentButton, CommentForm, CommentList, PostContainer, PostContent } from "./styles";
import authorImg from '../../assets/profilepic.png'
import { useEffect, useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";


const createCommentFormSchema = z.object({
    content: z.string().nonempty('Campo obrigatório!'),
})

type CreateCommentFormData = z.infer<typeof createCommentFormSchema>


export function Post() {

    

    const {
        register, 
        handleSubmit, 
        formState: {errors},
        watch,
        reset,
        } =  useForm<CreateCommentFormData>({
        resolver: zodResolver(createCommentFormSchema)
    })

    ///const commentFieldChange = watch('content')

    
    
    
    return(
        <PostContainer>
            <header>
                <Author>
                   <Avatar src={authorImg}/> 
                   <AuthorInfo>
                        <strong>Elias Medeiros</strong>
                        <span>Junior Developer</span>
                   </AuthorInfo>

                </Author>

                <time>
                    Just now
                </time>


                
                
            </header>

            
            <PostContent>
                Aqui ficará o conteúdo do post || Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quisquam tempore ullam nihil. Distinctio nisi possimus veniam est, tempore praesentium voluptatum eaque saepe sed quam omnis commodi debitis! Vero, id eos.
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