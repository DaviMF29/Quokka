from models.User import User
import bcrypt
import base64
from middleware.global_middleware import (
    verify_email_registered,verify_user,verify_change_in_user,
    add_like_to_post,remove_like_from_post)

def create_user_controller(email,username, password):
    verify_email_registered(email)
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt(10))
    hashed_password_base64 = base64.b64encode(hashed_password).decode()
    user_id = User.create_user_model(email,username, hashed_password_base64)
    return {"id": user_id, "message": f"User {username} created"}, 201

def add_favoritepost_controller(user_id, postId):
    user = verify_user(user_id)
    favorites = user.get("favorites", [])
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
    try:
        if not User.add_like_to_post(user_id, post_id):
            remove_like_from_post(post_id)
            return False, "Post already liked. Like removed"
        add_like_to_post(post_id)
        return True, "Post liked successfully"
    except Exception as e:
        return False, f"An error occurred: {str(e)}"


def add_following_controller(user_id, following_id):
    user = verify_user(user_id)
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



