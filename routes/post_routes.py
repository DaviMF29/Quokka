from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required

from controllers.post_controller import (
    create_post_controller, add_comment_to_post_controller,
    delete_post_controller, update_post_by_id_controller, get_all_posts_controller,
    get_post_by_id_controller,get_likes_from_post_controller
    
)

post_app = Blueprint("post_app", __name__)

@post_app.route("/api/posts")
def get_posts():
    posts = get_all_posts_controller()
    return jsonify(posts), 200

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
    data = request.get_json()
    username = data["username"]
    userId = data["userId"]
    text = data["text"] 
    createdAt = data["createdAt"]

    if data is None or data == {}:
        return jsonify({"message": "Empty body"}), 400
    
    if "username" not in data or "userId" not in data or "text" not in data or "createdAt" not in data:
        return jsonify({"message": "Missing required fields"}), 400


    post_id = create_post_controller(userId, username, text,createdAt)
    return jsonify({"id": post_id, "message": f"Post {text} created"}), 201



@post_app.route("/api/posts/comment", methods=["PUT"])
def add_comment_route():
    data = request.get_json()
    previousPostId = data["previousPostId"]
    username = data["username"]
    userId = data["userId"]
    text = data["text"]
    createdAt = data["createdAt"]


    if not all([previousPostId, username, userId, text]):
        return jsonify({"message": "Missing required fields"}), 400

    result = add_comment_to_post_controller(previousPostId, userId, username, text,createdAt)
    
    return jsonify(result)

@post_app.route("/api/posts/likes/<postId>", methods=["GET"])
def get_likes_from_posts(postId):
    return jsonify(get_likes_from_post_controller(postId)), 200

@post_app.route("/teste", methods=["POST"])
def teste():
    data = request.get_json()
    text = data["text"]
    from utils.user_posts import add_tag_to_post
    add_tag_to_post(text)
    return jsonify({"message": "Tag added"}), 200



