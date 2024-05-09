import { useState } from "react";
import { Avatar } from "../SideProfile/styles";
import { Trash, ThumbsUp } from "phosphor-react";
import { Comment,CommentBox, CommentContent, AuthorAndTime, DeleteCommentButton, LikeButton } from "./styles";
import profileImg from '../../assets/avatar_img2.avif';
import { useAuth } from "../../hooks/useAuth";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale/pt-BR";



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