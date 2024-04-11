import styled from "styled-components";

export const HeaderContainer = styled.header`
    background: ${props => props.theme['gray-700']};
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem 0;

    strong {
        font-size: 2.5rem;
        color: ${props => props.theme['blue-300']};;
    }
`


export const Logo = styled.img`
    height: 4rem;
    padding-right: 3rem;
    
`