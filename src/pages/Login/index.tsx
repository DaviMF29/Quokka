import { FormContainer, LoginContainer, LogoImg, LogoTitleContainer, RegisterButton, RegisterDiv, SubmitButton, TextImg } from "./styles";
import logo from '../../assets/urso branco 1.svg'
import text from '../../assets/quokka 1.svg'
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@radix-ui/themes";
import { NewRegisterModal } from "../../components/NewRegisterModal";
import * as z from 'zod';
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod";


    

    const loginUserFormSchema = z.object({
        email: z.string().email('Formato de email inválido!').nonempty('Campo obrigatório!').toLowerCase(),
        password: z.string().min(6, 'A senha precisa ter no mínimo 6 caracteres').nonempty(),
        
    })

    type LoginUserFormData = z.infer<typeof loginUserFormSchema>

export function Login(){

    
    

    const auth = useAuth()
    const history = useNavigate()

    const {
        register,
        handleSubmit,
        formState: {errors},
        reset,
    } = useForm<LoginUserFormData>({
        resolver: zodResolver(loginUserFormSchema)
    })

    async function loginUser(data:LoginUserFormData) {
        await auth.authenticate(data.email,data.password)
        history('/home')
    }


    return(
        <LoginContainer>

            <LogoTitleContainer>
                <LogoImg src={logo} alt="" />
                <TextImg src={text} alt="" />
            </LogoTitleContainer>
            <FormContainer 
                onSubmit={handleSubmit(loginUser)}
            >
                <input 
                    id="email"
                    type="text" 
                    placeholder="Email"
                    {...register('email')}
                    
                />

                
                
                <input 
                    id="password"
                    type="password"  
                    placeholder="Senha"
                    
                    {...register('password')}
                
                />

                <SubmitButton type="submit" >Entrar</SubmitButton>

                    <RegisterDiv>
                        <span>Ainda não tem conta?</span>
                        <Dialog.Root>
                                <Dialog.Trigger>
                                    <RegisterButton>Registrar</RegisterButton>
                                </Dialog.Trigger>
                                <NewRegisterModal />
                        </Dialog.Root>
                    </RegisterDiv>


            </FormContainer>

                
                
            
            
        </LoginContainer>
        
    )
}