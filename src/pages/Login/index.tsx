import { FormContainer, LoginContainer, LogoTitleContainer, RegisterButton, RegisterDiv, SubmitButton } from "./styles";
import logo from '../../assets/urso branco 1.svg'
import text from '../../assets/quokka 1.svg'
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { Dialog } from "@radix-ui/themes";
import { NewRegisterModal } from "../../components/NewRegisterModal";
import { useFormik } from "formik";
import * as yup from 'yup'


    const validationLogin = yup.object().shape({
        email: yup
        .string()
        .email('Não é um email válido!')
        .required('Este é um campo obrigatório!'),
        password: yup
        .string()
        .min(2, 'A senha deve ter no mínimo 8 caracteres')
        .required('Este é um campo obrigatório!'),
    })

export function Login(){

    
    

    const auth = useAuth()
    const history = useNavigate()


    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: validationLogin,
        
        onSubmit: async (data) => {
            console.log(data)
            await auth.authenticate(data.email, data.password)
            history('/home')
        }
    })




    return(
        <LoginContainer>

            <LogoTitleContainer>
                <img src={logo} alt="" />
                <img src={text} alt="" />
            </LogoTitleContainer>
            <FormContainer 
                onSubmit={formik.handleSubmit}
                validationSchema={validationLogin}
            >
                <input 
                    id="email"
                    name="email"
                    type="text" 
                    placeholder="Email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />

                
                
                <input 
                    id="password"
                    name="password"
                    type="password"  
                    placeholder="Senha"
                    onChange={formik.handleChange}
                    value={formik.values.password}
                
                />

                <SubmitButton type="submit" >Entrar</SubmitButton>

                    <RegisterDiv>
                        <p>Ainda não tem conta?</p>  
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