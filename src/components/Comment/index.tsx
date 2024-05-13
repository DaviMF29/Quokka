import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";
import { Trash } from "phosphor-react";
import profileImg from '../../assets/avatar_img2.avif';
import { useAuth } from "../../hooks/useAuth";
import { Avatar } from "../SideProfile/styles";
import { AuthorAndTime, Comment, CommentBox, CommentContent, DeleteCommentButton } from "./styles";



interface CommentsProps {
     content: string;
     userAvatarSrc?: string;
     username?: string;
     onDeleteComment?: () => void; 
 }


export function Comments({content}: CommentsProps) {

    const user = useAuth()
    const createdAt = new Date()
    const publishedDateRelativeToNow = formatDistanceToNow(createdAt,{
        locale:ptBR,
        addSuffix: true
    })

    return(
        <Comment>
            <Avatar src={profileImg}/>
            <CommentBox>
                <CommentContent>
                    <header>
                        <AuthorAndTime>
                            <strong>{user.username}</strong>
                            <time >
                                {publishedDateRelativeToNow}
                            </time>
                        </AuthorAndTime>

                        <DeleteCommentButton >
                            <Trash size={20} />
                        </DeleteCommentButton>
                    </header>
                    <p>{content}</p>
                </CommentContent>

                
            </CommentBox>
    </Comment>
)
}