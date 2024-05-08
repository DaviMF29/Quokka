from models.Post import Post
from utils.user_posts import (
    add_post_in_user, delete_post_from_user,delete_post_if_was_favorited)
from middleware.global_middleware import (
    verify_post, verify_change_in_text, verify_post_is_a_comment)


def create_post_controller(userId, username, text,createdAt, isCode=False, language=None,previousPostId = None):
    post_id = Post.create_post_model(userId, username, text,createdAt, isCode, language, previousPostId)
    post = get_post_by_id_controller(post_id)
    add_post_in_user(userId, post)
    return post_id

def get_all_posts_controller():
    return Post.get_all_posts()

def delete_post_controller(postId, userId):
    previous_post_id = verify_post_is_a_comment(postId)
    if previous_post_id:
        message = "Comment deleted"
    else:
        message = "Post deleted"

    Post.delete_comment_from_post_model(previous_post_id, postId) if previous_post_id else None
    Post.delete_post_by_id_model(postId)
    delete_post_if_was_favorited(postId)
    delete_post_from_user(userId, postId)

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
    new_comment = {
        "_id": _id,
        "userId": userId,
        "username": username,
        "text": text,
        "createdAt": createdAt,
        "likes": 0,
        "previousPost": previousPostId
    }

    post['comments'].append(new_comment)
    updated_fields = {"comments": post["comments"]}
    Post.update_post_by_id_model(previousPostId, updated_fields)

    return {"message": "Comment added successfully", "id": _id}, 200

def get_likes_from_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return {"likes": post["likes"]}