import { Box, Card } from "@radix-ui/themes";
import { Link } from "react-router-dom";
import styled from "styled-components";


export const StyledBox = styled(Box)`
    width: fit-content;
    



`

export const CardDiv = styled(Card)`
    background-color: ${props => props.theme['gray-700']};
    


`

export const StyledLink = styled(Link)`
    text-decoration: none;
    color: ${props => props.theme['gray-100']};
    transition: 0.3s;

    

`
