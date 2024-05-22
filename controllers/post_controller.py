from models.Post import Post
from utils.user_posts import (
    add_post_in_user)
from middleware.global_middleware import (
    verify_post, verify_change_in_text, verify_post_is_a_comment,
    verify_post_is_from_user,verify_user,validate_text_length)


def create_post_controller(userId, username, text,createdAt):
    verify_user(userId)
    post = Post(userId, username, text,createdAt)
    post_id = post.create_post_model()
    add_post_in_user(userId, post_id)
    validate_text_length(text)
    return post_id

def get_all_posts_controller():
    return Post.get_all_posts()

def delete_post_controller(postId, userId):
    verify_post_is_from_user(postId, userId)  
    message = "Post deleted successfully"
    Post.delete_post_by_id_model(postId)
    return {"message": message}


def get_post_by_id_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return Post.get_post_by_id_model(postId)

def update_post_by_id_controller(postId, text):       
    verify_change_in_text(postId,text)
    updated_fields = {"text": text}
    Post.update_post_by_id_model(postId, updated_fields)
    return {"message": "Post updated successfully"}

def get_likes_from_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return {"likes": post["likes"]}