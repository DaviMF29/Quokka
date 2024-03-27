import * as  Dialog  from "@radix-ui/react-dialog";
import { Content, Input, Overlay, RegisterContainer, RegisterForm, Error, Title, CloseButton, SubmitButton } from "./styles";
import * as yup from 'yup';
import { X } from "phosphor-react";
import { useFormik } from "formik";
import { api } from "../../services/api";

export function NewRegisterModal() {

    

    const validationRegister = yup.object().shape({
        email: yup
        .string()
        .email('Não é um email válido!')
        .required('Este é um campo obrigatório!'),
        username: yup
        .string()
        .required('Este é um campo obrigatório!')
        .min(4, 'O nick deve ter pelo menos 4 caracteres!'),
        password: yup
        .string()
        .min(8, 'A senha deve ter no mínimo 8 caracteres')
        .required('Este é um campo obrigatório!'),
        passwordConfirmation: yup
        .string()
        .oneOf([yup.ref('password')], 'As senhas devem ser iguais!')
    })

    const formik = useFormik({
        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema: {validationRegister},
        onSubmit: async(data) => {
            console.log(data)
        }
    })


    return(
        <Dialog.Portal>
            <Overlay>
                <Content>

                    <CloseButton>
                        <X size={48}/>
                    </CloseButton>
                    
                    <Title>Registrar</Title>
                    <RegisterContainer
                            validationSchema={validationRegister}
                            onSubmit={formik.handleSubmit}>
                               
                                <RegisterForm>
                                    
                                    <Input name='email' placeholder='Email'/>
                                    <Error 
                                        component='span'
                                        name="email"
                                    />
                                    <Input name='username' placeholder='Username'/>
                                    <Error 
                                        component='span'
                                        name="username"
                                    />
                                    <Input name='password' placeholder='Senha' type='password'/>
                                    <Error 
                                        component='span'
                                        name="password"
                                    />
                                    <Input name='passwordConfirmation' placeholder='Repita a senha' type='password'/>
                                    <Error 
                                        component='span'
                                        name="passwordConfirmation"
                                    />
                                    <SubmitButton type='submit'>Cadastrar</SubmitButton>
                                </RegisterForm>
                    </RegisterContainer>
                </Content>
            </Overlay>
        </Dialog.Portal>
    )
}