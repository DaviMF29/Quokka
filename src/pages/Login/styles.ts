import styled from "styled-components";

export const LoginContainer = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme['gray-800']};
    color: white;
    display: flex;
    justify-content: space-around;
    align-items: center;
    
    @media(max-width: 1010px){
        flex-direction: column; 
        padding: 20px; 
        text-align: center;
        height: fit-content;
        justify-content: center
        
    }
    
    
`

export const LogoTitleContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    


`

export const LogoImg = styled.img`
    width: 500px;
    @media(max-width: 1010px){
        display: none;
    }
`
export const TextImg = styled.img`
    width: 500px;
    
    @media(max-width: 1010px){
        
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
    box-shadow: -50px 50px 40px rgba(0, 0, 0, 0.5);
    
    

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

    P{
        margin: 0;
    }
    
`

export const RegisterButton = styled.button`

    background: none;
    color: ${props => props.theme['blue-300']};
    cursor: pointer;
    border: 0 none;
    text-decoration: underline;

`

