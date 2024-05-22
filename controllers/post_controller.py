from models.Post import Post
from utils.user_posts import (
    add_post_in_user)
from middleware.global_middleware import (
    verify_post, verify_change_in_text, verify_post_is_a_comment,
    verify_post_is_from_user,verify_user,validate_text_length)


def create_post_controller(userId, username, text,createdAt, isCode=False, language=None,previousPostId = None):
    verify_user(userId)
    post_id = Post.create_post_model(userId, username, text,createdAt, isCode, language, previousPostId)
    add_post_in_user(userId, post_id)
    validate_text_length(text)
    return post_id

def get_all_posts_controller():
    return Post.get_all_posts()

def delete_post_controller(postId, userId):
    verify_post_is_from_user(postId, userId)
    previous_post_id = verify_post_is_a_comment(postId)
    
    message = "Post deleted successfully"
    if previous_post_id:
        message = "Comment deleted successfully"
        Post.delete_comment_from_post_model(previous_post_id, postId)
    
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

def add_comment_to_post_controller(previousPostId, userId, username, text,createdAt, isCode=False, language=None):
    post = verify_post(previousPostId)
    if not post:
        return {"message": "Post not found"}, 404

    if 'comments' not in post:
        post['comments'] = []
    _id = create_post_controller(userId, username, text,createdAt, isCode=isCode, language=language, previousPostId=previousPostId)
    
    validate_text_length(text)
    verify_user(userId)
    verify_post(previousPostId)
    post['comments'].append(_id)
    updated_fields = {"comments": post["comments"]}
    Post.update_post_by_id_model(previousPostId, updated_fields)

    return {"message": "Comment added successfully", "id": _id}, 200

def get_likes_from_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return {"likes": post["likes"]}