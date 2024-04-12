import styled from "styled-components";


export const Wrapper = styled.div`
    background: ${props => props.theme['gray-900']};
    height: 100vh;
    

`


export const HomeContainer = styled.div`
    max-width: 70rem;
    margin: 2rem auto;
    padding: 0 1rem;
    display: grid;
    grid-template-columns: 256px 1fr;
    gap: 2rem;
    align-items: flex-start;

`


export const CreateNewPostDiv = styled.div`
    position: absolute;
    top: 90%;
    right: 2%;
`

export const OpenCreateNewPostButton = styled.button`
    height: 3.5rem;
    width: 3.5rem;
    border-radius: 999px;
    background-color: ${props => props.theme['blue-300']};
    color: white;
    border: none;
    cursor: pointer;
    transition: 0.3s;

    &:hover{
        background-color: ${props => props.theme['blue-400']};
    }

`