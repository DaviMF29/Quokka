from models.Post import Post
from bson import ObjectId
from middleware.global_middleware import (
    verify_post, verify_change_in_text, verify_post_is_a_comment)


def create_post_controller(userId, username, text,createdAt, isCode=False, language=None,previousPostId = None):
    post_id = Post.create_post_model(userId, username, text,createdAt, isCode, language, previousPostId)
    return post_id

def get_all_posts_controller():
    return Post.get_all_posts()

def delete_post_controller(postId):
    previous_post_id = verify_post_is_a_comment(postId)
    if previous_post_id:
        Post.delete_comment_from_post_model(previous_post_id, postId)
        Post.delete_post_by_id_model(postId)
        return {"message": "Comment deleted"}
    else:
        Post.delete_post_by_id_model(postId)
        return {"message": "Post deleted"}

def get_post_by_id_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return post


def update_post_by_id_controller(postId, text):       
    verify_change_in_text(postId,text)
    updated_fields = {"text": text}
    Post.update_post_by_id_model(postId, updated_fields)
    return {"message": "Post updated successfully"}


def add_like_to_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "This post does not exist"}, 404
    
    updated_fields = {"likes": post.get("likes", 0) + 1}
    Post.update_post_by_id_model(postId, updated_fields)
    return {"message": "Like added successfully"}, 200

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





