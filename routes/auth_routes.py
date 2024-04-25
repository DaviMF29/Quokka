from flask import request, jsonify, Blueprint
from controllers.auth_controller import login
from flask_jwt_extended import jwt_required
from controllers.auth_controller import get_user_data
auth_app = Blueprint("auth_app", __name__)


@auth_app.route("/api/login", methods=["POST"])
def login_route():
    data = request.get_json()
   
    email = data["email"]
    password = data["password"]

    response, status_code = login(email, password)
    return jsonify(response), status_code

@auth_app.route('/api/data_user', methods=['GET'])
@jwt_required()
def get_user_data_route():
    return get_user_data()