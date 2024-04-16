import styled from "styled-components";

export const Aside = styled.aside`
    background: ${props => props.theme['gray-800']};
    border-radius: 8px;
    overflow: hidden;
    

    

    footer {
        text-align: center;
        color: ${props => props.theme['blue-300']};
        border-top: 1px solid ${props => props.theme['gray-600']};
        margin-top: 1.5rem;
        padding: 1.5rem 2rem 2rem;
        display: flex;
        align-items: center;
        justify-content: center;
    }

`

export const Cover = styled.img `
    width: 100%;
    height: 72px;
    object-fit: cover;
`

export const ProfileButton = styled.button`
        background: transparent;
        color: ${props => props.theme['blue-300']};
        border: 1px solid ${props => props.theme['blue-300']};
        border-radius: 8px;
        height: 50px;
        padding: 0 1.5rem;
        font-weight: bold;
        cursor: pointer;
        text-decoration: none;

        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;

        transition: color 0.1s, background-color 0.1s;

        &:hover {
            background-color: ${props => props.theme['blue-300']};
            color: ${props => props.theme['gray-100']};
        }

`

export const Profile = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: -2rem;

    strong {
        margin-top: 1rem;
        color: ${props => props.theme['gray-100']};
        line-height: 1.6;
    }

    span {
        font-size: 0.875rem;
        color: ${props => props.theme['gray-300']};
        line-height: 1.6;
    }

    div{
        display: flex;
        gap: 1rem;
        margin: 8px;

        span { 
            color: ${props => props.theme['gray-100']};
            font-weight: bold;
            border: 1px solid ${props => props.theme['blue-300']};
            border-radius: 5px;
            margin-top: 1rem;
            padding: 0.2rem 0.5rem;
            
        }
    }

`

export const Avatar = styled.img`
    box-sizing: initial;
    width: 3rem;
    height: 3rem;
    border-radius: 8px;
    border: 4px solid ${props => props.theme['gray-800']};
    outline: 2px solid ${props => props.theme['blue-300']};

`