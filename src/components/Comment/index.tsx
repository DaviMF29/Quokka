import { useState } from "react";
import { Avatar } from "../SideProfile/styles";
import { Trash, ThumbsUp } from "phosphor-react";
import { Comment,CommentBox, CommentContent, AuthorAndTime, DeleteCommentButton, LikeButton } from "./styles";

// interface CommentsProps {
//     content: string;
//     userAvatarSrc: string;
//     username: string;
//     commentDateTime: string;
//     onDeleteComment: () => void; 
// }
export function Comments({content} : {content: string}) {

    const [likeCount, setLikeCount] = useState(0)

    function handleLikeComment(){
        setLikeCount(likeCount+1)
    }


    return(
        <Comment>
            <Avatar src="https://avatars.githubusercontent.com/eliasmedeiros898"/>
            <CommentBox>
                <CommentContent>
                    <header>
                        <AuthorAndTime>
                            <strong>Elias Medeiros</strong>
                            <time dateTime={new Date().toString()}>
                                agora há pouco
                            </time>
                        </AuthorAndTime>

                        <DeleteCommentButton>
                            <Trash size={20} />
                        </DeleteCommentButton>
                    </header>
                    <p>{content}</p>
                </CommentContent>

                <footer>
                    <LikeButton onClick={handleLikeComment}>
                        <ThumbsUp/>
                        Aplaudir <span>{likeCount}</span>
                        </LikeButton> 
                </footer>
            </CommentBox>
    </Comment>
)
}