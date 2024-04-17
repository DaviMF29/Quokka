import * as Dialog  from "@radix-ui/react-dialog";
import styled from "styled-components";


export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0,0,0,0.9);
    
    
`

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${props => props.theme['gray-900']};
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid ${props => props.theme['blue-300']};

   
    
`

export const Title = styled(Dialog.Title)`
    color: white;
    font-weight: 600;
    font-size: 48px;

`
export const CloseButton = styled(Dialog.Close)`
    position: absolute;
    background: transparent;
    border: 0;
    top: 1.5rem;
    right: 1.5rem;
    line-height: 0;
    cursor: pointer;
    color: white;

`

export const SubmitButton = styled.button`
    
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    height: 15%;
    padding: 1rem;
    background-color: ${props => props.theme['blue-300']};
    color: white;
    font-size: 38px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 2.5rem;

    &:hover {
        background-color: ${props => props.theme['blue-400']};
    }

`

export const RegisterFormContainer = styled.form`

    
    width: 100%;
    height: 30rem;
    margin-top: 1rem;
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    
    

`

export const Input = styled.input`

    
    height: 3rem;
    width: 90%;
    padding: 1rem;
    margin: 1rem;
    border-radius: 6px;

`
export const FormError = styled.span`

    color: ${props => props.theme['red-500']};
    font-size: 12px;


`