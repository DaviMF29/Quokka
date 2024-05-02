from flask import abort
from models.User import User
from models.Post import Post

#CONSTANTES
MAX_TEXT_LENGTH = 300

def verify_user(userId):               
    user = User.get_user_by_id_model(userId)
    if not user:
        abort(400, {"message": "User not exist"})
    return user

def verify_email_registered(email):          
    user = User.get_user_by_email_model(email)
    if user:
        abort(400, {"message": "Email is not available"})
    return {"message": "Email is available"}

def verify_post(postId):
    post = Post.get_post_by_id_model(postId)
    if not post:
        abort(400, {"message": "Post not exist"})
    return post


def validate_text_length(text):
    if len(text) >= MAX_TEXT_LENGTH:
        abort(400, {"message": "Number of characters exceeded"})
    return True

def verify_change_in_text(postId, new_text):          
    post = verify_post(postId)
    text = post.get("text")
    if text == new_text:
        abort(400, "The text is the same")
    return text

def verify_post_is_a_comment(postId):
    verify_post(postId)
    post = Post.get_post_by_id_model(postId)
    previous_post = post.get("previousPostId")
    if previous_post:
        return previous_post
    return False


def verify_post_is_from_user(postId, userId):
    post = verify_post(postId)
    if post.get("userId") == userId:
        return True
    abort(400, {"message": "This post does not belong to the user"})    

def verify_change_in_user(user_id, field_name, new_value):
    user = verify_user(user_id)
    if field_name in user:
        current_value = user[field_name]
        if current_value == new_value:
            abort(400, f"The {field_name} is the same")
        return current_value
    else:
        abort(400, f"User data is missing '{field_name}' field")


def delete_all_posts_from_user(userId):
    posts = Post.get_all_posts_from_user_model(userId)
    post_ids = [post.get("_id") for post in posts if post.get("userId") == userId]
    for post_id in post_ids:
        Post.delete_post_by_id_model(post_id) 
    
    return True
