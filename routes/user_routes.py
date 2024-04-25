from flask import request, jsonify, Blueprint
from controllers.user_controller import create_user_controller, add_favoritepost_controller, delete_user_controller
from flask_jwt_extended import jwt_required
from middleware.global_middleware import delete_all_posts_from_user

users_app = Blueprint("users_app", __name__)

allowed_domains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com", "live.com","aluno.uepb.edu.br"]

@users_app.route("/api/users", methods=["POST"])
def create_user_route():
    data = request.get_json()
    
    username = data["username"].lower()
    email = data["email"].lower()
    password = data["password"].lower()

    if len(password) < 6:
        return jsonify({"message": "Password must have at least 6 characters"}), 400

    if "@" not in email:
        return jsonify({"message": "Invalid email"}), 400

    domain = email.split("@")[-1]
    if domain not in allowed_domains:
        return jsonify({"message": "Only specific email domains are allowed"}), 401

    response, status_code = create_user_controller(email, username, password)
    return jsonify(response), status_code


@users_app.route("/api/users/favorite", methods=["PUT"])
@jwt_required()
def add_favorite_post_route():
    data = request.get_json()
    user_id = data["userId"]
    post_favorite = data["postId"]
    response, status_code = add_favoritepost_controller(user_id, post_favorite)
    return jsonify(response), status_code

@users_app.route("/api/users/<userId>", methods=["DELETE"])
@jwt_required()
def delete_user_route(userId):
    response, status_code = delete_user_controller(userId)
    if status_code == 200:
        delete_all_posts_from_user(userId)
    return jsonify(response), status_code
