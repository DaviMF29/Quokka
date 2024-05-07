from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required

from middleware.global_middleware import (
    verify_user, verify_post,validate_text_length, verify_post_is_from_user)

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
@jwt_required()
def delete_post_route(postId):
    data = request.get_json()
    userId = data["userId"]
    verify_post_is_from_user(postId,userId)
    delete_post_controller(postId)
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
    isCode = data.get("isCode", False)

    if not all([username, userId, text]):
        return jsonify({"message": "Missing required fields"}), 400

    language = None
    if isCode and "language" not in data:
        return jsonify({"message": "Field 'language' is required when 'isCode' is True"}), 400
    language = data.get("language")

    try:
        verify_user(userId)
    except:
        return jsonify({"message": "User not exist"}), 400

    post_id = create_post_controller(userId, username, text,createdAt, isCode=isCode, language=language)
    return jsonify({"id": post_id, "message": f"Post {text} created"}), 201



@post_app.route("/api/posts/comment", methods=["PUT"])
def add_comment_route():
    data = request.get_json()
    previousPostId = data["previousPostId"]
    username = data["username"]
    userId = data["userId"]
    text = data["text"]
    createdAt = data["createdAt"]
    isCode = data.get("isCode", False)
    language = None

    if not all([previousPostId, username, userId, text]):
        return jsonify({"message": "Missing required fields"}), 400

    if isCode:
        language = data["language"]

    if isCode and "language" not in data:
        return jsonify({"message": "Field 'language' is required when 'isCode' is True"}), 400

    try:
        verify_user(userId)
        verify_post(previousPostId)
    except:
        return jsonify({"message": "User or initial post does not exist"}), 404
    
    validate_text_length(text)

    result = add_comment_to_post_controller(previousPostId, userId, username, text,createdAt, isCode, language) if isCode else add_comment_to_post_controller(previousPostId, userId, username, text,createdAt)
    
    return jsonify(result)

@post_app.route("/api/posts/likes/<postId>", methods=["GET"])
def get_likes_from_posts(postId):
    return jsonify(get_likes_from_post_controller(postId)), 200





