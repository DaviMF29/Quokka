from models.User import User
import bcrypt
import base64
import hashlib

from utils.user_posts import add_like_to_post,remove_like_from_post

from middleware.global_middleware import (
    verify_email_registered,verify_user,verify_change_in_user,
    verify_post_in_user_favorites)

from utils.user_posts import (
    delete_all_notifications_from_user, delete_all_posts_from_user)


def create_user_controller(email,username, password):
    verify_email_registered(email)
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt(10))
    hashed_password_base64 = base64.b64encode(hashed_password).decode()
    hashed_email_sha256 = hashlib.sha256(email.encode()).hexdigest()
    image = f"https://www.gravatar.com/avatar/{hashed_email_sha256}"
    user_id = User.create_user_model(username,email,image, hashed_password_base64)
    return {"id": user_id, "message": f"User {username} created"}, 201

def add_or_remove_favorite_post_controller(user_id, postId):
    already_in_favorites = verify_post_in_user_favorites(user_id, postId)
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
    delete_all_notifications_from_user(userId)
    delete_all_posts_from_user(userId)
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

    liked_posts = set(user.get("liked_posts", []))

    if post_id in liked_posts:
        liked_posts.remove(post_id)
        remove_like_from_post(post_id)
        action = "unliked"
    else:
        liked_posts.add(post_id)
        add_like_to_post(post_id)
        action = "liked"

    User.update_user(user_id, {"liked_posts": list(liked_posts)})

    return True, f"Post {action} successfully"


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
    final_posts = []
    for following_id in following:
        posts = User.get_all_posts_from_user(following_id)
        final_posts.extend(posts)                            
    return final_posts


def get_favorite_posts_controller(user_id):
    verify_user(user_id)
    favorites = User.get_favorite_posts_model(user_id)
    posts = []
    for post_id in favorites:
        posts.append(post_id)
    return posts

def get_posts_likeds_controller(user_id):
    verify_user(user_id)
    likedPosts = User.get_posts_liked_by_user_model(user_id)
    posts = []
    for post_id in likedPosts:
        posts.append(post_id)
    return posts

def get_user_by_username_controller(username):
    user = User.get_user_by_username_model(username)
    if not user:
        return {"message": "User not found"}, 404
    user.pop('password', None)
    return user

def get_user_by_id_controller(user_id):
    try:
        user = User.get_user_by_id_model(user_id)
        if not user:
            return {"message": "User not found"}, 404

        filtered_user = {
            '_id': user.get('_id'),
            'email': user.get('email'),
            'image': user.get('image'),
            'username': user.get('username')
        }
        return filtered_user
    except Exception as e:
        return {"message": "Failed to retrieve user"}, 500

def get_all_posts_from_user(userId):
    verify_user(userId)
    posts = User.get_all_posts_from_user(userId)
    return posts