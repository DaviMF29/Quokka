from models.User import User
from models.Post import Post

def add_post_in_user(user_id, post):
    user = User.get_user_by_id_model(user_id)
    posts = user.get("posts", [])
    posts.append(post)
    User.update_user(user_id, {"posts": posts})