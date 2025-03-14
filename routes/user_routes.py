from datetime import datetime
from flask import request, jsonify, Blueprint

from controllers.notification_controller import (
    create_notification_controller)
    #delete_notification_by_id_controller

from controllers.post_controller import (
    get_text_from_post_controller,get_userId_from_post_controller
)

from controllers.user_controller import (
    create_user_controller,add_or_remove_favorite_post_controller,
    delete_user_controller,update_user_controller,
    add_like_to_post_controller,add_following_controller,
    get_all_following_controller,get_posts_from_following_controller,
    get_favorite_posts_controller,get_user_by_username_controller,
    get_all_posts_from_user,get_posts_likeds_controller,
    get_user_by_id_controller,add_image_to_user_controller,
    get_all_users_controller,get_username_by_id_controller,
    get_userId_by_username_controller)

from flask_jwt_extended import jwt_required
from models.User import User

from flask_jwt_extended import get_jwt_identity


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
    response, status_code = add_or_remove_favorite_post_controller(user_id, post_favorite)
    return jsonify(response), status_code

@users_app.route("/api/users/<userId>", methods=["DELETE"])
@jwt_required()
def delete_user_route(userId):
    response, status_code = delete_user_controller(userId)
    return jsonify(response), status_code


@users_app.route("/api/users/<user_id>", methods=["PUT"])
@jwt_required()
def update_user_route(user_id):
    data = request.get_json()

    try:
        update_user_controller(user_id, data)
        return jsonify({"message": "User updated"}), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@users_app.route("/api/users/like", methods=["POST"])
@jwt_required()
def add_like_to_post_route():

    data = request.get_json()
    current_user_id = get_jwt_identity()
    postId = data["postId"]

    username = get_username_by_id_controller(current_user_id)
    recipientId = get_userId_from_post_controller(postId)
    createdAt = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%fZ")
    text = get_text_from_post_controller(postId)
    notification_text = f"{username} curtiu seu post {text}"
    success, message = add_like_to_post_controller(current_user_id, postId)
    
    if success and message == "Post liked successfully":
        create_notification_controller(current_user_id, recipientId, notification_text, createdAt, "like", False)
    elif success:
        return jsonify({"message": message}), 200
    else:
        pass
    
    return jsonify({"message": message}, 400)



@users_app.route("/api/users/following", methods=["PUT"])
@jwt_required()
def add_following_route():
    data = request.get_json()
    user_id = data["userId"]
    following_id = data["followingId"]
    createdAt = datetime.now().strftime("%Y-%m-%dT%H:%M:%S.%fZ")

    message, status_code = add_following_controller(user_id, following_id)
    
    notification_text = f"{get_username_by_id_controller(user_id)} começou a seguir você"
    if message == "User followed successfully":
        create_notification_controller(user_id, following_id, notification_text, createdAt, "like", False)

    return jsonify({"message": message}), status_code

@users_app.route("/api/users/<userId>/following", methods=["GET"])
@jwt_required()
def get_following_route(userId):
    response = get_all_following_controller(userId)
    return jsonify(response), 200

@users_app.route("/api/users/following/posts", methods=["GET"])
@jwt_required()
def get_following_posts_route():
    userId = get_jwt_identity()
    response = get_posts_from_following_controller(userId)
    return jsonify(response), 200

@users_app.route("/api/users/favorite/posts", methods=["GET"])
@jwt_required()
def get_favorite_posts_route():
    userId = get_jwt_identity()
    response = get_favorite_posts_controller(userId)
    return jsonify(response), 200


@users_app.route("/api/users/<username>", methods=["GET"])
def get_user_by_username_route(username):
    response = get_user_by_username_controller(username)
    return jsonify(response), 200

@users_app.route("/api/users/posts", methods=["GET"])
@jwt_required()
def get_my_posts_route():
    userId = get_jwt_identity()
    response = get_all_posts_from_user(userId)
    return jsonify(response), 200

@users_app.route("/api/users/liked_posts", methods=["GET"])
@jwt_required()
def get_my_likedposts():
    userId = get_jwt_identity()
    response = get_posts_likeds_controller(userId)
    return jsonify(response), 200


@users_app.route("/api/user/<userId>", methods=["GET"])
def get_user_by_id_route(userId):
    response = get_user_by_id_controller(userId)
    return jsonify(response), 200

@users_app.route("/api/user/image", methods=["POST"])
@jwt_required()
def add_profile_image_route():
    user_id = get_jwt_identity()
    if 'file' not in request.files:
        return jsonify({"error": "No image was sended"}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({"error": "No file selected"}), 400
    try:
        add_image_to_user_controller(user_id, file)
        return jsonify({"message": "Image added"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 400

@users_app.route("/api/users", methods=["GET"])
def get_all_users_route():
    users = get_all_users_controller()
    return jsonify(users), 200



@users_app.route("/api/userId/<username>", methods=["GET"])
def get_userId_by_username_route(username):
    response = get_userId_by_username_controller(username)
    return jsonify(response), 200
#---------------------------------EXTRA--------------------------------

@users_app.route("/api/users/teste", methods=["POST"])
def update_all_users_route():
    data = request.get_json()
    if "field" not in data:
        return jsonify({"error": "Field name not provided"}), 400

    field = data["field"]
    result = User.add_new_field_to_all_users(field)
    return jsonify({"message": f"Number of documents updated: {result.modified_count}"}), 200

