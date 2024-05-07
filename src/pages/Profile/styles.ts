import styled from "styled-components";
import { Box, Tabs } from "@radix-ui/themes";

export const ProfileWrapper = styled.div`
    background: ${props => props.theme['gray-900']};
    width: 100vw;
    min-height: 100vh;
    height: fit-content;
    color: ${props => props.theme['gray-100']};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 2rem;
    gap: 1rem;
    position: absolute;
    top: -1rem;
    

    h1{
        height: 2rem;
    }
`

export const ProfilePicture = styled.img`
    box-sizing: initial;
    width: 15rem;
    height: 15rem;
    border-radius: 8px;
    border: 4px solid ${props => props.theme['gray-800']};
    outline: 2px solid ${props => props.theme['blue-300']};

`

export const ProfileInfo = styled.div`
    position: absolute;
    left: 15rem;
    top: 13rem;
    
    height: fit-content;
    border-radius: 10px;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.3);
    backdrop-filter: blur(50px);
    
`

export const StyledBox = styled(Box)`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0px 10px 5px rgba(0, 0, 0, 0.3);
    width: 100%;
    margin-top: 2rem;
    color: ${props => props.theme['gray-100']};
    background: ${props => props.theme['gray-900']};

    form {
        display: flex;
        gap: 2rem;
        div{
            display: flex;
            flex-direction: column;
            gap: 1rem;

            input{
                padding: 0.5rem;
                border-radius: 5px;
                border: 1px solid ${props => props.theme['gray-800']};
                background: ${props => props.theme['gray-800']};
                color: ${props => props.theme['gray-100']};

                &:disabled{
                    background: ${props => props.theme['gray-700']};
                    color: ${props => props.theme['gray-500']};
                    cursor: not-allowed;
                }

                
            }
        }
        
    }
`




export const StyledTabTrigger = styled(Tabs.Trigger)`
    color: white;
`





export const ProfileText = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    
    h1 {
        font-size: 32px;
    }

    h3 {
        font-size: 20px;
    }

`





export const Banner = styled.img`
    width: 100%;
    height: 16rem;  
    background-color: ${props => props.theme['gray-100']};
    margin-top: -2rem;
    object-fit: cover;
`