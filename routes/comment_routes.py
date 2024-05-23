from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required

from controllers.comment_controller import (
    create_comment_controller,delete_comment_controller,
    get_comments_controller
)

comment_app = Blueprint("comment_app", __name__)


@comment_app.route("/api/comments", methods=["POST"])
@jwt_required()
def create_post_route():
    data = request.get_json()

    if data is None or data == {}:
        return jsonify({"message": "Empty body"}), 400

    required_fields = ["username", "userId", "text", "createdAt"]
    if not all(field in data for field in required_fields):
        return jsonify({"message": "Missing required fields"}), 400

    username = data["username"]
    userId = data["userId"]
    text = data["text"] 
    createdAt = data["createdAt"]
    postId = data["postId"]

    post_id = create_comment_controller(postId,userId, username, text, createdAt)
    return jsonify({"id": post_id, "message": f"Post '{text}' created"}), 201

@comment_app.route("/api/comments/<comment_id>", methods=["DELETE"])
def delete_comment_route(comment_id):
    data = request.get_json()
    post_id = data["postId"]
    delete_comment_controller(post_id,comment_id)
    return jsonify({"message": "Comment deleted successfully"}), 200

@comment_app.route("/api/comments/<comment_id>", methods=["GET"])
def get_comment_route(comment_id):
    comment = get_comments_controller(comment_id)
    return jsonify(comment), 200