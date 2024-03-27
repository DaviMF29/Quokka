import * as Dialog  from "@radix-ui/react-dialog";
import styled from "styled-components";
import {Formik, Form, Field, ErrorMessage} from 'formik';

export const Overlay = styled(Dialog.Overlay)`
    position: fixed;
    width: 100vw;
    height: 100vh;
    inset: 0;
    background: rgba(0,0,0,0.75);
    
    
`

export const Content = styled(Dialog.Content)`
    min-width: 32rem;
    border-radius: 6px;
    padding: 2.5rem 3rem;
    background: black;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    border: 1px solid white;
    
`

export const RegisterContainer = styled(Formik)`
    width: 100vw;
    height: 100vh;
    background: black;
    color: white;
    display: flex;
    justify-content: center;
    
    

`

export const RegisterForm = styled(Form)`
    display: flex;
    margin: 100px;
    flex-direction: column;
    gap: 1.25rem;
    align-items: center;
    

    
    p {
        font-size: 50px;
    }

`
export const Input = styled(Field)`
    width: 600px;
    background-color: black;
    border: 1px solid gray;
    padding: 1.25rem;
    border-radius: 6px;
    color: white;
    font-size: 24px;
`


export const Error = styled(ErrorMessage)`
    color: red;
    overflow: hidden;
    font-size: 12px;
    

`

export const Title = styled(Dialog.Title)`
    padding-top: 3rem;
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
    width: 400px;
    padding: 1rem;
    background-color: #1B9CCE;
    color: white;
    font-size: 38px;
    border: none;
    cursor: pointer;
    transition: 0.2s;
    margin-top: 2.5rem;

    &:hover {
        background-color: #035d80;
    }

`