import { useState } from "react";
import { Avatar } from "../SideProfile/styles";
import { Trash, ThumbsUp } from "phosphor-react";
import { Comment,CommentBox, CommentContent, AuthorAndTime, DeleteCommentButton, LikeButton } from "./styles";

export function Comments(content:any) {

    const [likeCount, setLikeCount] = useState(0)

    function handleLikeComment(){
        setLikeCount(likeCount+1)
    }


    return(
        <Comment>
            <Avatar src="https://avatars.githubusercontent.com/u/82901702?v=4"/>
            <CommentBox>
                <CommentContent>
                    <header>
                        <AuthorAndTime>
                            <strong>Alexandre Star</strong>
                            <time dateTime="2023-08-24 18:58:59">
                                Cerca de 1hr atrás
                            </time>
                        </AuthorAndTime>

                        <DeleteCommentButton>
                            <Trash size={20}/>
                        </DeleteCommentButton>
                    </header>
                    <p>Conteudo aqui</p>
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