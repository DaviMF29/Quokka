from models.User import User
import bcrypt
import base64
import hashlib

from utils.user_posts import order_posts_by_createdAt

from middleware.global_middleware import (
    verify_email_registered,verify_user,verify_change_in_user,
    verify_post_in_user_favorites)

def create_user_controller(email,username, password):
    verify_email_registered(email)
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt(10))
    hashed_password_base64 = base64.b64encode(hashed_password).decode()
    hashed_email_sha256 = hashlib.sha256(email.encode()).hexdigest()
    image = f"https://www.gravatar.com/avatar/{hashed_email_sha256}"
    user_id = User.create_user_model(email,username,image, hashed_password_base64)
    return {"id": user_id, "message": f"User {username} created"}, 201

def add_or_remove_favorite_post_controller(user_id, postId):
    already_in_favorites, message = verify_post_in_user_favorites(user_id, postId)
    user = verify_user(user_id)
    favorites = user.get("favorites", [])
    if already_in_favorites:
        favorites.remove(postId)
        User.update_user(user_id, {"favorites": favorites})
        return {"message": "Favorite removed"}, 200
    favorites.append(postId)
    User.update_user(user_id, {"favorites": favorites})
    return {"message": "Favorite added"}, 201

def delete_user_controller(userId):
    verify_user(userId)
    User.delete_account_model(userId)
    return {"message": "User deleted"}, 200

def update_user_controller(user_id, new_data):
    updated_fields = {}
    for key, value in new_data.items():
        if key != "_id":  # proibir alteração do _id
            updated_fields[key] = value

    for field_name, new_value in updated_fields.items():
        verify_change_in_user(user_id, field_name, new_value)

    User.update_user(user_id, updated_fields)

    return {"message": "User updated"}

def add_like_to_post_controller(user_id, post_id):
    user = verify_user(user_id)

    if user is None:
        return False, "User not found"

    liked_posts = user.get("liked_posts", [])
    if post_id not in liked_posts:
        liked_posts.append(post_id)
        User.update_user(user_id, {"liked_posts": liked_posts})
        return True, "Post liked successfully"
    else:
        liked_posts.remove(post_id)
        User.update_user(user_id, {"liked_posts": liked_posts})
        return False, "Post unliked successfully"

def add_following_controller(user_id, following_id):
    user = verify_user(user_id)
    verify_user(following_id)
    following = user.get("following", [])
    user_following = verify_user(following_id)
    followers = user_following.get("followers", [])

    if following_id not in following and user_id not in followers:
        following.append(following_id)
        followers.append(user_id)
        message = "User followed successfully"
    else:
        following.remove(following_id)
        followers.remove(user_id)
        message = "User unfollowed successfully"
        
    User.update_user(user_id, {"following": following})
    User.update_user(following_id, {"followers": followers})
    return {"message": message}, 200

def get_all_following_controller(user_id):
    verify_user(user_id)
    following = User.get_following_model(user_id)
    return following

def get_posts_from_following_controller(user_id):
    verify_user(user_id)
    following = User.get_following_model(user_id)
    posts = []
    for following_id in following:
        posts.append(User.get_all_posts_from_user(following_id))
    order_posts_by_createdAt(posts)
    return posts

def get_favorite_posts_controller(user_id):
    verify_user(user_id)
    favorites = User.get_favorite_posts_model(user_id)
    posts = []
    for post_id in favorites:
        posts.append(post_id)
    return posts


def get_user_by_username_controller(username):
    user = User.get_user_by_username_model(username)
    if not user:
        return {"message": "User not found"}, 404
    return user