from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required
from concurrent.futures import ThreadPoolExecutor

from controllers.post_controller import (
    create_post_controller,delete_post_controller,
    update_post_by_id_controller, get_all_posts_controller,
    get_post_by_id_controller,get_likes_from_post_controller,
    get_comments_from_post_controller,get_all_posts_limited_controller
    
)

from utils.user_posts import add_tag_to_post
from utils.notifications_utils import create_notification_async

post_app = Blueprint("post_app", __name__)

@post_app.route("/api/posts")
def get_posts():
    posts = get_all_posts_controller()
    return jsonify(posts), 200

@post_app.route("/api/posts/limited")
def get_limited_posts():
    page = request.args.get('page', default=1, type=int)
    limit = request.args.get('limit', default=10, type=int)
    return jsonify(get_all_posts_limited_controller(page, limit)), 200

@post_app.route("/api/posts/<postId>")
def get_post_by_id(postId):
    post = get_post_by_id_controller(postId)
    return jsonify(post)

@post_app.route("/api/posts/<postId>", methods=["DELETE"])
def delete_post_route(postId):
    data = request.get_json()
    userId = data["userId"]
    delete_post_controller(postId,userId)
    return jsonify({"message": "Post deleted"}), 200

@post_app.route("/api/posts/<postId>", methods=["PUT"])
@jwt_required()
def update_post_route(postId):
    data = request.get_json()
    new_text = data.get("text", None)

    if not new_text:
        return jsonify({"message": "Field 'text' is required"}), 400

    try:
        update_post_by_id_controller(postId, new_text)
        return jsonify({"message": "Post updated successfully"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@post_app.route("/api/posts", methods=["POST"])
@jwt_required()
def create_post_route():
    username = request.form.get("username")
    userId = request.form.get("userId")
    text = request.form.get("text")
    createdAt = request.form.get("createdAt")

    if not all([username, userId, text, createdAt]):
        return jsonify({"message": "Missing required fields"}), 400

    images = request.files.getlist('file')
    if len(images) > 4:
        return jsonify({"error": "Exceeded maximum number of images (4)"}), 400

    replaced_text, usernames = add_tag_to_post(text)
    text_10_chars = text[:10] if len(text) > 10 else text
    post_text = f"{username} mencionou você em um post: '{text_10_chars}'"
    try:
        post_id = create_post_controller(userId, username, replaced_text, createdAt, images)

        usernames = list(set(usernames))

        with ThreadPoolExecutor() as executor:
            futures = []
            for mentioned_username in usernames:
                future = executor.submit(create_notification_async, userId, mentioned_username, post_text, createdAt)
                futures.append(future)

            for future in futures:
                future.result()

        return jsonify({"id": post_id, "message": f"Post '{text}' created"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400



@post_app.route("/teste", methods=["POST"])
def teste():
    data = request.get_json()
    text = data["text"]
    return jsonify(add_tag_to_post(text)), 200

@post_app.route("/api/posts/likes/<postId>", methods=["GET"])
def get_likes_from_posts(postId):
    return jsonify(get_likes_from_post_controller(postId)), 200

@post_app.route("/api/posts/comments/<postId>", methods=["GET"])
def get_comments_from_post(postId):
    response, status_code = get_comments_from_post_controller(postId)
    return jsonify(response), status_code





