from models.User import User
from models.Post import Post
from datetime import datetime
from flask import jsonify


def add_post_in_user(user_id, post):
    user = User.get_user_by_id_model(user_id)
    posts = user.get("posts", [])
    posts.append(post)
    User.update_user(user_id, {"posts": posts})

def order_posts_by_createdAt(posts_list):
    for posts in posts_list:
        sorted_posts = sorted(posts, key=lambda x: datetime.strptime(x['createdAt'], '%H:%M:%S:%d/%m/%Y'))
        for post in sorted_posts:
            print(post['createdAt'])

def delete_post_from_user(user_id, post_id):
    user = User.get_user_by_id_model(user_id)
    posts = user.get("posts")
    if not posts:
        return jsonify({"message": "User has no posts"}), 400
    posts = [post for post in posts if post.get("_id") != post_id]
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