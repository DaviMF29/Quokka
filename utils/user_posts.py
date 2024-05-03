from models.User import User
from models.Post import Post
from datetime import datetime


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