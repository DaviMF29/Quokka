import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: black;
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    
`

export const LogoTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    img {
        width: 500px;
    }

`

export const FormContainer = styled.form`
    display: flex;
    flex-direction: column;
    height: fit-content;
    gap: 100px;
    padding: 4rem 2.5rem;
    align-items: center;
    background: ${props => props.theme['gray-900']};
    border-radius: 8px;
    border: 3px double ${props => props.theme['blue-300']};
    

    input {
        height: 50px;
        width: 400px;
        border: none;
        outline: none;
        border-radius: 8px;
        padding: 2rem;
        font-size: 24px;
    }


`

export const SubmitButton = styled.button`
    
    border-radius: 8px;
    width: 400px;
    padding: 1rem;
    background-color: ${props => props.theme['blue-300']};
    color: white;
    font-size: 38px;
    border: none;
    cursor: pointer;
    transition: 0.2s;

    &:hover {
        background-color: ${props => props.theme['blue-400']};
    }

`

export const RegisterDiv = styled.div`
    display: flex;
    gap: 1rem;
`

export const RegisterButton = styled.button`

    background: none;
    color: ${props => props.theme['blue-300']};
    cursor: pointer;
    border: 0 none;
    text-decoration: underline;

`
