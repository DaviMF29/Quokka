from models.Comment import Comment

from middleware.global_middleware import (
    verify_user,validate_text_length
)

from utils.user_posts import add_comments_in_post,delete_comment_from_post
    
def create_comment_controller(postId, userId, username, text, createdAt):
    verify_user(userId)
    comment = Comment(postId, userId, username, text, createdAt)
    comment_id = comment.create_comment_model()
    validate_text_length(text)
    add_comments_in_post(postId, comment_id)
    return comment_id

def delete_comment_controller(post_id,comment_id):
    message = "Comment deleted successfully"
    delete_comment_from_post(post_id,comment_id)
    Comment.delete_comment_model(comment_id)
    return {"message": message}

def get_comments_controller(comment_id):
    comment = Comment.get_comments_model(comment_id)
    return comment