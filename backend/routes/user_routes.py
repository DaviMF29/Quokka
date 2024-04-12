from flask import request, jsonify, Blueprint
from controllers.user_controller import create_user_controller

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
        return jsonify({"message": "Only specific email domains are allowed"}), 400

    response, status_code = create_user_controller(email, username, password)
    return jsonify(response), status_code
