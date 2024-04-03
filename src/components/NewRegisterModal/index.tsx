import * as  Dialog  from "@radix-ui/react-dialog";
import { Content, Overlay,  Title, CloseButton, SubmitButton, RegisterFormContainer, Input, FormError } from "./styles";
import { X } from "phosphor-react";
import { useForm } from "react-hook-form";
import {z} from 'zod';
import {zodResolver} from '@hookform/resolvers/zod'
import { api } from "../../services/api";


const createUserFormSchema = z.object({
    username: z.string().nonempty('Campo obrigatório!'),
    email: z.string().email('Formato de email inválido!').nonempty('Campo obrigatório!').toLowerCase(),
    password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres').nonempty(),
    
})

type CreateUserFormData = z.infer<typeof createUserFormSchema>


export function NewRegisterModal() {

    const {
        register, 
        handleSubmit, 
        formState: {errors},
        reset
        } =  useForm<CreateUserFormData>({
        resolver: zodResolver(createUserFormSchema)
    })

    

    async function createUser(data:CreateUserFormData) {

       const { email, username, password} = data
        
        
        
        try {

            await api.post('/api/users', {
                username,
                email,
                password
            })

            
            
        } catch (error) {
            console.error(error)
        }
        

        reset()
    }

   


    return(
        <Dialog.Portal>
            <Overlay>
                <Content>

                    <CloseButton>
                        <X size={48}/>
                    </CloseButton>
                    
                    
                    <Title>Cadastre-se</Title>

                    <RegisterFormContainer
                        onSubmit={handleSubmit(createUser)}
                    
                    >

                        <Input 
                            type="email" 
                            placeholder="Email"
                            {...register('email')}/>

                            {errors.email && <FormError>{errors.email.message}</FormError>}
                            
                        <Input 
                            type="text" 
                            placeholder="Username" 
                            {...register('username')}/>

                            {errors.username && <FormError>{errors.username.message}</FormError>}
                        <Input 
                            type="password"  
                            placeholder="Senha"
                            {...register('password')}/>

                            {errors.password && <FormError>{errors.password.message}</FormError>}
                        <SubmitButton type='submit'>Cadastrar</SubmitButton>
                    </RegisterFormContainer>



                    

                    
                    
                </Content>
            </Overlay>
        </Dialog.Portal>
    )
}