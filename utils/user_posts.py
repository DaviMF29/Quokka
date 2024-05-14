from models.Notification import Notification
from models.User import User
from models.Post import Post
from flask import jsonify


def add_post_in_user(user_id, postId):
    user = User.get_user_by_id_model(user_id)
    posts = user.get("posts", [])
    posts.append(postId)
    User.update_user(user_id, {"posts": posts})

def delete_post_from_user(user_id, post_id):
    user = User.get_user_by_id_model(user_id)
    posts = user.get("posts")
    if not posts:
        return jsonify({"message": "User has no posts"}), 400
    if post_id not in posts:
        return jsonify({"message": "Post not found in user"}), 404
    else:
        posts.remove(post_id)
    User.update_user(user_id, {"posts": posts})
    return posts


def add_like_to_post(post_id):
    post = Post.get_post_by_id_model(post_id)
    likes = post.get("likes", 0)
    likes += 1
    Post.update_post_model(post_id, {"likes": likes})
    return jsonify({"message": "Like added"}), 200

def remove_like_from_post(post_id):
    post = Post.get_post_by_id_model(post_id)
    likes = post.get("likes", 0)
    likes -= 1
    Post.update_post_model(post_id, {"likes": likes})
    return jsonify({"message": "Like removed"}), 200


def delete_post_if_was_favorited(post_id):
    users = User.get_all_users()
    for user in users:
        favorites = user.get("favorites", [])
        if post_id in favorites:
            favorites = [fav for fav in favorites if fav != post_id]
            User.update_user(user.get("_id"), {"favorites": favorites})
    return jsonify({"message": "Post removed from favorites"}), 200


def delete_post_if_was_liked(post_id):
    users = User.get_all_users()
    for user in users:
        likes = user.get("liked_posts", [])
        if post_id in likes:
            likes = [like for like in likes if like != post_id]
            User.update_user(user.get("_id"), {"liked_posts": likes})
    return jsonify({"message": "Post removed from likes"}), 200

def delete_all_posts_from_user(userId):
    posts = Post.get_all_posts_from_user_model(userId)
    post_ids = [post.get("_id") for post in posts if post.get("userId") == userId]
    for post_id in post_ids:
        Post.delete_post_by_id_model(post_id) 
    
    return True

def delete_all_notifications_from_user(userId):
    return Notification.delete_all_notifications_by_userId(userId)
    
def add_tag_to_post(text):
    if "@" in text:
        start_index = text.index("@")
        end_index = start_index
        while end_index < len(text) and text[end_index] != " ":
            end_index += 1
        tag = text[start_index:end_index]
        remaining_text = text[end_index:]
        print(tag)
        add_tag_to_post(remaining_text)
    else:
        print("acabou")