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