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
    text: string
    isCode: boolean

}
export function NewPostModal(){

    const {register, handleSubmit,reset} = useForm<NewPostProps>()

    //const [posts, setPosts] = useState<NewPostProps[]>([])

    const user = useAuth()

    const [username, setUsername] = useState<string>('')
    const [userId,setUserId] = useState<string>('')
    

    

    async function handleCreateNewPost(data:NewPostProps){
        if(user.access_token){
            const accessToken = user.access_token
            const userInfo = await user.getUserInfo(accessToken)
            setUsername(userInfo.username)
            setUserId(userInfo._id)
            const text = data.text

            await api.post("/api/posts",{
                text,
                username,
                userId,
                isCode:false,
            })
            reset()
           
            
            
        }
        
    
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