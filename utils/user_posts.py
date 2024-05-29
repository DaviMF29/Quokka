from models.Notification import Notification
from models.User import User
from models.Post import Post
from models.Comment import Comment
from flask import abort, jsonify


def add_post_in_user(user_id, postId):
    user = User.get_user_by_id_model(user_id)
    posts = user.get("posts", [])
    posts.append(postId)
    User.update_user(user_id, {"posts": posts})

def add_comments_in_post(post_id,comment_id):
    post = Post.get_post_by_id_model(post_id)
    comments = post.get("comments", [])
    comments.append(comment_id)
    Post.update_post_model(post_id, {"comments": comments})

def delete_comment_from_post(post_id, comment_id):
    post = Post.get_post_by_id_model(post_id)
    comments = post.get("comments")
    print(comments)
    if comments is None:
        return abort(404, description="Post has no comments")
    if comment_id not in comments:
        return abort(404, description="Comment not found in post")
    Post.delete_comment_from_post_model(post_id, comment_id)
    comments.remove(comment_id)
    Post.update_post_model(post_id, {"comments": comments})
    return comments



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
    users = User.get_all_users_model()
    for user in users:
        favorites = user.get("favorites", [])
        if post_id in favorites:
            favorites = [fav for fav in favorites if fav != post_id]
            User.update_user(user.get("_id"), {"favorites": favorites})
    return jsonify({"message": "Post removed from favorites"}), 200


def delete_post_if_was_liked(post_id):
    users = User.get_all_users_model()
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

def delete_comments_from_post(post_id):
    comments = Post.get_post_by_id_model(post_id).get("comments")
    if comments is None:
        return jsonify({"message": "Post has no comments"}), 400
    for comment_id in comments:
        Comment.delete_comment_model(comment_id)
    return jsonify({"message": "Comments deleted"}), 200

 ###############################################################   
import re

def add_tag_to_post(text):
    def replace_at(match):
        username = match.group(1)
        user = User.get_user_by_username_model(username)
        if user:
            return f"<a href=/{username}>@{username}</a>"
        return f"@{username}"

    pattern = r"@(\w+)"
    replaced_text = re.sub(pattern, replace_at, text)
    return replaced_text