import { Popover } from "@radix-ui/themes";
import { List } from "phosphor-react";
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

export const PopoverDiv = styled(Popover.Content)`
    background: ${props => props.theme['gray-800']};
    color: ${props => props.theme['gray-100']};
    max-width: 30rem;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-height: 70vh;
    overflow-y: auto;
`


export const NotificationDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: top;
    
    padding: 1rem;
    border-bottom: 1px solid ${props => props.theme['gray-700']};
    transition: 0.3s;
    margin-top: 0.25rem;
    gap: 1rem;
    &:hover{
        background-color: ${props => props.theme['gray-700']};
        border-radius: 6px;
    }

`

export const DeleteNotificationButton = styled.button`
    background-color: transparent;
    width: fit-content;
    height: fit-content;
    border: none;

    &:hover{
        color: ${props => props.theme['red-500']};
    }


`

export const DeleteAllButton = styled.button`
    background-color: transparent;
    text-decoration: underline;
    color: ${props => props.theme['blue-300']};
    border: none;
    padding-top: 1rem;
    transition: 0.3s;

    &:hover{
        color: ${props => props.theme['red-500']};
    }
`


export const StyledListIcon = styled(List)`
    color:  ${props => props.theme['gray-300']};

    &:hover{
        color: ${props => props.theme['red-500']};
    }

`


