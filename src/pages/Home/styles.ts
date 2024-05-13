import styled from "styled-components";


export const Wrapper = styled.div`
    background: ${props => props.theme['gray-900']};
    min-height: 100vh;
    height: 100%;
    

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
    position: fixed;
    top: 90%;
    left: 94%;
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


export const Posts = styled.div`
    color: white;

`



export const NotPostList = styled.div`
    font-size: 32px;
    margin-top: 5rem;
    color: white;


`
