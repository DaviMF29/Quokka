import { formatDistanceToNow, set } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Trash } from "phosphor-react";
import profileImg from '../../assets/avatar_img2.avif';
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "../SideProfile/styles";
import { AuthorAndTime, Comment, CommentBox, CommentContent, DeleteCommentButton } from "./styles";
import { useEffect, useState } from "react";
import { api } from "../../services/api";



interface CommentParamType {
    commentId:string
    setPostState: React.Dispatch<React.SetStateAction<boolean>>
    handleDeleteComment: (commentId:string, postId:string) => Promise<void>
 }

interface CommentProps {
    postId: string,
    userId: string,
    username: string,
    text: string,
    createdAt: Date,
}


export function Comments({commentId, setPostState, handleDeleteComment}:CommentParamType) {

    const user = useAuth()
    const [comment, setComment] = useState<CommentProps>({} as CommentProps)
    const [commentLoaded, setCommentLoaded] = useState<boolean>(false)
    

    function formatTimeAgo(isoDate: string): string {
        const date = new Date(isoDate);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);
    
        const secondsInMinute = 60;
        const secondsInHour = 3600;
        const secondsInDay = 86400;
        const secondsInMonth = 30 * secondsInDay; // Aproximadamente
        const secondsInYear = 365 * secondsInDay; // Aproximadamente
    
        if (diffInSeconds < secondsInMinute) {
            return `há menos de um minuto`;
        } else if (diffInSeconds < secondsInHour) {
            const minutes = Math.floor(diffInSeconds / secondsInMinute);
            return `há ${minutes} minuto${minutes > 1 ? 's' : ''}`;
        } else if (diffInSeconds < secondsInDay) {
            const hours = Math.floor(diffInSeconds / secondsInHour);
            return `há ${hours} hora${hours > 1 ? 's' : ''}`;
        } else if (diffInSeconds < secondsInMonth) {
            const days = Math.floor(diffInSeconds / secondsInDay);
            return `há ${days} dia${days > 1 ? 's' : ''}`;
        } else if (diffInSeconds < secondsInYear) {
            const months = Math.floor(diffInSeconds / secondsInMonth);
            return `há ${months} mês${months > 1 ? 'es' : ''}`;
        } else {
            const years = Math.floor(diffInSeconds / secondsInYear);
            return `há ${years} ano${years > 1 ? 's' : ''}`;
        }
    }

    const isAuthor = user.userId === comment.userId

    async function getCommentById() {
        const response = await api.get(`/api/comments/${commentId}`)
        setComment(response.data)
        setPostState(false)
    }

    

    useEffect(() => {
        getCommentById();
        setCommentLoaded(true);
    }, [commentLoaded]);

    return(
        <Comment>
            <Avatar src={profileImg}/>
            <CommentBox>
                <CommentContent>
                    <header>
                        <AuthorAndTime>
                            <strong>{comment.username}</strong>
                            <time>
                                {comment.createdAt && formatTimeAgo(comment.createdAt.toString())}
                            </time>
                        </AuthorAndTime>

                        {isAuthor && <DeleteCommentButton onClick={ () => handleDeleteComment(commentId, comment.postId)}>
                            <Trash size={20} />
                        </DeleteCommentButton>}
                    </header>
                    <p>{comment.text}</p>
                </CommentContent>

                
            </CommentBox>
    </Comment>
)
}