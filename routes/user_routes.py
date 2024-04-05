from flask import request, jsonify, Blueprint
from controllers.user_controller import login, create_user_controller

users_app = Blueprint("users_app", __name__)


@users_app.route("/api/login", methods=["POST"])
def login_route():
    data = request.get_json()
    if "email" not in data or "password" not in data:
        return jsonify({"message": "Missing email or password"}), 400

    email = data["email"]
    password = data["password"]

    response, status_code = login(email, password)
    return jsonify(response), status_code

@users_app.route("/api/users", methods=["POST"])
def create_user_route():
    data = request.get_json()
    if not all(key in data for key in ["username", "email", "password"]):
        return jsonify({"message": "Missing required fields"}), 400


    username = data["username"]
    email = data["email"]
    password = data["password"]
    response, status_code = create_user_controller(email, username, password)
    return jsonify(response), status_code
