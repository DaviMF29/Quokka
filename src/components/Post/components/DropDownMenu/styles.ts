import Dropdown from 'react-bootstrap/Dropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import styled from 'styled-components';

export const HamburguerButton = styled(Dropdown.Toggle)`
    background: transparent;
    border: none;
    color: white;
    cursor: pointer;
    
    &:hover {
        background: ${props => props.theme['blue-300']};
    }

    

`


export const DropdownMenu = styled(Dropdown.Menu)`

    background: ${props => props.theme['gray-600']};
    width: 4vw;
    height: 10vh;
    z-index: 0;
    

`


export const DropdownItem = styled(Dropdown.Item)`

    color: ${props => props.theme['blue-300']};
    
    
    span{
        color: ${props => props.theme['red-300']};
        font-weight: bold;
    }
`

export const EditChoice = styled.div`

    display: flex;
    gap: 1rem;
    
    span{
        color: ${props => props.theme['blue-300']};
    }

`

export const OffCanvas = styled(Offcanvas)`
    background: #212529;

`


export const OffCanvasHeader = styled(Offcanvas.Header)`

    color: white;
    font-weight: bolder;
    
    

`
export const OffCanvasBody = styled(OffCanvas.Body)`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    justify-content: initial;
    align-items: center;
    

`



export const PreviousPost = styled.form`
    margin-top: 5rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    align-items: center;
    justify-content: center;

    textarea{
        resize: none;
        width: 100%;
        height: 45vh;
        padding: 1rem;
    }


`

export const EditButton = styled.button`

    margin-top: 8rem;
    width: 70%;
    height: 3rem;
    background: ${props => props.theme['blue-300']};
    border:  none;
    color: white;
    font-weight: bolder;
    cursor: pointer;
    border-radius: 6px;
    transition: 0.5s;
    &:hover{
        background: ${props => props.theme['blue-400']};
    }
    


`

export const PreviousPostContent = styled.div`
    border: 1px solid ${props => props.theme['blue-300']};
    border-radius: 6px;
    padding: 1rem;
    width: 100%;
    height: 55vh;
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;


`


