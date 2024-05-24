import styled from "styled-components";



export const HeaderContainer = styled.header`
    background: ${props => props.theme['gray-700']};
    position: sticky;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    padding: 1rem 0;
    z-index: 1;
    opacity: 0.8;
    backdrop-filter: blur(15px);

    strong {
        font-size: 2.5rem;
        color: ${props => props.theme['blue-300']};;
    }

    

    div {
        display: flex;
        align-items: center;
        gap: 3rem;
    }

`

export const ExitButton = styled.button`

        background-color: ${props => props.theme['blue-300']};
        border: none;
        border-radius: 4px;
        width: 4rem;
        height: 2rem;
        color: ${props => props.theme['gray-100']};
        font-weight: bold;
        cursor: pointer;
        margin-right: 2rem;
        transition: 0.3s;

        &:hover{
            background-color: ${props => props.theme['gray-100']};
            color: ${props => props.theme['blue-300']};
        }
`


export const NotificationButton = styled.button`
    
    background-color:transparent;
    color: white;
    border: none;
    transition: 0.3s;

    &:hover{
        
        color: ${props => props.theme['blue-300']};
    }

`

    


export const Logo = styled.img`
    height: 4rem;
    padding-right: 3rem;
    margin-left: 2rem;
    
`

