import * as  Dialog  from "@radix-ui/react-dialog";
import { SubmitButton} from "../NewRegisterModal/styles";
import { TextAreaPost, Title, Overlay, Content } from "./styles";
import { useForm } from "react-hook-form";

interface NewPostProps {
    id: string
    text: string

}
export function NewPostModal(){

    const {register, handleSubmit,reset} = useForm<NewPostProps>()

    function handleCreateNewPost(data:NewPostProps){
        console.log(data)
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