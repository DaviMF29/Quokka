from models.Comment import Comment

from middleware.global_middleware import (
    verify_user,validate_text_length
)

from utils.user_posts import add_comments_in_post
    
def create_comment_controller(postId, userId, username, text, createdAt):
    verify_user(userId)
    comment = Comment(postId, userId, username, text, createdAt)
    comment_id = comment.create_comment_model()
    validate_text_length(text)
    add_comments_in_post(postId, comment_id)
    return comment_id
