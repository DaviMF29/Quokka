import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    margin: 0;
    padding: 0;
    background-color: ${props => props.theme['gray-900']};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    
`

export const MessageBox = styled.div`
    width: 55rem;
    height: calc(width - 20%);
    border: 1px solid ${props => props.theme['blue-300']};
    border-radius: 6px;
    color: ${props => props.theme['gray-100']};
    background-color: ${props => props.theme['gray-700']};
    font-size: 5vw;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;

    

`

export const BackButton = styled.button`
    width: 14rem;
    height: 4rem;
    background-color: ${props => props.theme['blue-300']};
    color: ${props => props.theme['gray-100']};
    font-size: 1.25rem;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
    margin: 20px 0;
    

    &:hover {
        background-color: ${props => props.theme['blue-400']};
    }

    @media(max-width: 1669px){
        padding: 0.7rem;
        
        
    }
`