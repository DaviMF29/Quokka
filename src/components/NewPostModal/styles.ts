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
    min-width: 50rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: ${props => props.theme['gray-900']};
    position: fixed;
    gap: 3rem;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid ${props => props.theme['blue-400']};

    form{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        gap: 2.5rem;
    }

   
    
`


export const TextAreaPost = styled.textarea`
    width: 100%;
    height: 10rem;
    resize: none;
    border: none;
    background: ${props => props.theme['gray-800']};
    padding: 1rem;
    color: white;
    font-size: 16px;
    font-weight: bold;
    
    &:focus {
        outline: 1px solid ${props => props.theme['white']};
    }

`

export const Title = styled.h1`
    color: white;
    font-weight: 600;
    font-size: 48px;


`

