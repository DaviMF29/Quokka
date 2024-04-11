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

`


