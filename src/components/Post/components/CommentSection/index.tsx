import { Popover, Button, Flex, Avatar, TextArea, Checkbox, Box } from "@radix-ui/themes";
import { useAuth } from "../../../../hooks/useAuth";
import { z } from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const createCommentFormSchema = z.object({
    content: z.string().nonempty('Campo obrigatório!'),
})

type CreateCommentFormData = z.infer<typeof createCommentFormSchema>


interface CommentProps {
    postId : string
    

}




export function CommentSection({postId}:CommentProps) {

    const user = useAuth()
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

    //const commentFieldChange = watch('content')

    async function addNewComment(data: CreateCommentFormData) {
        console.log('comentado:', data.content);
        if (user.access_token && user.userId && user.username) { 
            await user.addComment(user.access_token, postId, data.content, user.userId, user.username);
        }
        setComments(prevComments => [...prevComments, data]);
        reset()
    }
    


    return(
        
       <Popover.Root>
        <Popover.Trigger>
            <Button variant="solid" color="cyan">
                
                Comment
            </Button>
        </Popover.Trigger>
        <Popover.Content>
            <Flex gap="3" >
            <Avatar
                size="2"
                src="https://images.unsplash.com/photo-1607346256330-dee7af15f7c5?&w=64&h=64&dpr=2&q=70&crop=focalpoint&fp-x=0.67&fp-y=0.5&fp-z=1.4&fit=crop"
                fallback="A"
                radius="full"
            />
            <Box>
                <TextArea 
                    placeholder="Escreva um comentário…"
                    {...register('content')} 
                    style={{ height: 80 }} 
                    />
                <Flex gap="3" mt="3" justify="between">
                    <Flex align="center" gap="2" asChild>
                        
                    </Flex>

                    <Popover.Close>
                        <Button 
                            size="1" 
                            color="cyan"
                            onClick={handleSubmit(addNewComment)}
                            >Comment</Button>
                    </Popover.Close>
                </Flex>
            </Box>
            </Flex>
        </Popover.Content>
    </Popover.Root> 
    )


    

}