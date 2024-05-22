from models.Comment import Comment
from utils.user_posts import (
    add_post_in_user)
from middleware.global_middleware import (
    verify_user,validate_text_length
)
    
    
def create_comment_controller(postId, userId, username, text, createdAt):
    verify_user(userId)
    comment = Comment(postId, userId, username, text, createdAt)
    post_id = comment.create_comment_model()
    add_post_in_user(userId, post_id)
    validate_text_length(text)
    return post_id
