import * as  Dialog  from "@radix-ui/react-dialog";
import { SubmitButton,CloseButton} from "../NewRegisterModal/styles";
import { TextAreaPost, Title, Overlay, Content,  } from "./styles";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { X } from "phosphor-react";
import { api } from "../../services/api";

interface NewPostProps {
    userId: string
    username: string
    text?: string
    isCode?: boolean
    setPostState: React.Dispatch<React.SetStateAction<boolean>>;

}
export function NewPostModal({userId, username, setPostState}:NewPostProps){

    const {register, handleSubmit,reset} = useForm<NewPostProps>()
    
    async function handleCreateNewPost(data: NewPostProps) {
        
    
            const text = data.text;
            
            setTimeout(async () => {
                try {
                    await api.post("/api/posts", {
                        text,
                        username,
                        userId,
                        createdAt: new Date(),
                    });
                    setPostState(false)
                    reset();
                } catch (error) {
                    console.error('Erro ao criar novo post:', error);
                }
            }, 1000);
        
    }


    

    return(
        <Dialog.Portal>
            <Overlay>
                <Content>
                    <form onSubmit={handleSubmit(handleCreateNewPost)}>
                        <Title>Crie seu post:</Title>
                        <CloseButton>
                            <X size={32}/>
                        </CloseButton>
                        <TextAreaPost 
                            placeholder="O que quer compartilhar hoje?"
                            {...register("text")}
                        />
                        <SubmitButton type="submit">Criar Post</SubmitButton>
                    </form>
                    
                </Content>
            </Overlay>
        </Dialog.Portal>
    )
}