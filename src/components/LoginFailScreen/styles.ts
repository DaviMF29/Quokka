import styled from "styled-components";

export const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background-color: ${props => props.theme['gray-900']};
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const MessageBox = styled.div`
    width: 50vw;
    height: 30vh;
    border: 1px solid ${props => props.theme['blue-300']};
    border-radius: 6px;
    color: ${props => props.theme['gray-100']};
    background-color: ${props => props.theme['gray-700']};
    font-size: 100px;
    display: flex;
    align-items: center;
    justify-content: center;


`

export const BackButton = styled.button`
    width: 12vw;
    height: 7vh;
    background-color: ${props => props.theme['blue-300']};
    color: ${props => props.theme['gray-100']};
    font-size: 20px;
    font-weight: bold;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: 0.2s;
    margin: 20px 0;

    &:hover {
        background-color: ${props => props.theme['blue-400']};
    }
`