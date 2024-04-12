import styled from "styled-components";

export const Comment = styled.div`
    margin-top: 1.5rem;
    display: flex;
    gap: 1rem;

    img {
        width: 3rem;
        height: 3rem;
        border-radius: 8px;
    }



`

export const CommentBox = styled.div`
    flex: 1;
    width: 100%;
    


    footer {
        margin-top: 1rem;

        
    }

    footer svg {
        margin-right: 0.5rem;
    }

`


export const CommentContent = styled.div`
    background: ${props => props.theme['gray-700']};
    border-radius: 8px;
    padding: 1rem;

    header {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
    }

    p{
        margin-top: 1rem;
        color: ${props => props.theme['gray-300']};
    }

`


export const AuthorAndTime = styled.div`
    
    strong {
        display: block;
        font-size: 0.875rem;
        line-height: 1.6;
        color: white;
    }

    time {
        display: block;
        font-size: 0.75rem;
        line-height: 1.6;
        color: ${props => props.theme['gray-400']};
    }


`


export const DeleteCommentButton = styled.button`
    background: transparent;
    border: 0;
    color: ${props => props.theme['gray-400']};
    cursor: pointer;
    border-radius: 2px;

    &:hover {
        color: ${props => props.theme['red-500']};
    }


`


export const LikeButton = styled.button`
    background: transparent;
    border: 0;
    color: ${props => props.theme['gray-400']};
    cursor: pointer;

    display: flex;
    align-items: center;
    border-radius: 2px;
    gap: 0.2rem;

    &:hover{
      color:  ${props => props.theme['blue-300']};
    }

`