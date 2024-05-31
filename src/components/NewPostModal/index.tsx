import * as Dialog from "@radix-ui/react-dialog";
import { SubmitButton, CloseButton } from "../NewRegisterModal/styles";
import { TextAreaPost, Title, Overlay, Content } from "./styles";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/useAuth";
import { Dispatch, SetStateAction } from "react";
import { X } from "phosphor-react";
import { api } from "../../services/api";

interface NewPostProps {
    userId: string;
    username: string;
    text?: string;
    isCode?: boolean;
    setPostState: Dispatch<SetStateAction<boolean>>;
    setOpenState: Dispatch<SetStateAction<boolean>>;
}

export function NewPostModal({ userId, username, setPostState, setOpenState }: NewPostProps) {
    const { register, handleSubmit, reset } = useForm<NewPostProps>();
    const user = useAuth();

    async function handleCreateNewPost(data: NewPostProps) {
        const formData = new FormData();
        formData.append('text', data.text || '');
        formData.append('username', username);
        formData.append('userId', userId);
        formData.append('createdAt', new Date().toISOString());

        try {
            await api.post("/api/posts", formData, {
                headers: {
                    Authorization: `Bearer ${user.access_token}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setPostState(false);
            setOpenState(false);
            reset();
        } catch (error) {
            console.error('Erro ao criar novo post:', error);
        }
    }

    return (
        <Dialog.Portal>
            <Overlay>
                <Content>
                    <form onSubmit={handleSubmit(handleCreateNewPost)}>
                        <Title>Crie seu post:</Title>
                        <CloseButton>
                            <X size={32} />
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
    );
}