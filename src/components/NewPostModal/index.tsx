import * as  Dialog  from "@radix-ui/react-dialog";
import { SubmitButton} from "../NewRegisterModal/styles";
import { TextAreaPost, Title, Overlay, Content } from "./styles";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { useEffect, useState } from "react";

interface NewPostProps {
    userId: string
    username: string
    text: string
    isCode: boolean

}
export function NewPostModal(){

    const {register, handleSubmit,reset} = useForm<NewPostProps>()

    const [token, setToken] = useState<string>('')

    //const [posts, setPosts] = useState<NewPostProps[]>([])

    const user = useAuth()

    useEffect(() => {
        const storedAccessToken = localStorage.getItem('u')
        if(storedAccessToken){
            setToken(storedAccessToken)
        }
    },[])

    

    async function handleCreateNewPost(data:NewPostProps){
        const jsonObject = JSON.parse(token)
        const accessToken = jsonObject.access_token
        const userInfo = await user.getUserInfo(accessToken)
        console.log(userInfo._id, data)
        reset()
    }

    return(
        <Dialog.Portal>
            <Overlay>
                <Content>
                    <form onSubmit={handleSubmit(handleCreateNewPost)}>
                        <Title>Crie seu post</Title>
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