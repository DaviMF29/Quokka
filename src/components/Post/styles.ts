import styled from "styled-components";

export const PostContainer = styled.article`
    background: ${props => props.theme['gray-800']};
    border-radius: 8px;
    padding: 2.5rem;
    

    &+&{
        margin-top: 2rem;
    }

    header {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    & > header time {
        font-size: 0.875rem;
        color: ${props => props.theme['gray-400']};
    }
    &:last-child{
        margin-bottom: 2rem
    }

`

export const Author = styled.div`
    display: flex;
    align-items: center;
    gap: 1rem;

`
export const AuthorInfo = styled.div`
    strong {
        display: block;
        color: ${props => props.theme['gray-100']};
        line-height: 1.6;  

    }
    
    span {
        display: block;
        font-size: 0.875rem;
        color: ${props => props.theme['gray-400']};
        line-height: 1.6;
    }

`


export const PostContent = styled.div`
    line-height: 1.6;
    color: ${props => props.theme['gray-300']};
    margin-top: 1.5rem;

    

`

export const CommentForm = styled.form`
    width: 100%;
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid ${props => props.theme['gray-600']};

    strong{
        line-height: 1.6;
        color: ${props => props.theme['gray-100']};
    }

    textarea {
        width: 100%;
        height: 5rem;
        background: ${props => props.theme['gray-900']};
        border: 0;
        resize: none;
        height: 6rem;
        padding: 1rem;
        border-radius: 8px;
        color: ${props => props.theme['gray-100']};
        line-height: 1.4;
        margin-top:1rem;

        &:focus {
            outline: 1px solid ${props => props.theme['blue-300']};
        }
    }

`

export const CommentList = styled.div`
    margin-top: 2rem;
`

export const CommentButton = styled.button`
    padding: 1rem 1.5rem;
    margin-top: 1rem;
    border-radius: 8px;
    border: 0;
    background: ${props => props.theme['blue-300']};
    color: ${props => props.theme['white']};
    font-weight: bold;
    cursor: pointer;
    transition: background 0.1s;

    &:not(:disabled):hover {
        background: ${props => props.theme['blue-400']};
    }

    &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
    }




`

export const DeleteButton = styled.button`
    background: transparent;
    border: 0;
    color: ${props => props.theme['red-300']};
    cursor: pointer;
    border-radius: 2px;
    transition: 0.3s;
    display: flex;
    align-items: center;
    gap: 1rem;

    &:hover{
        color: ${props => props.theme['red-500']};
    }


`
