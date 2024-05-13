from flask import request, jsonify, Blueprint
from flask_jwt_extended import jwt_required

from controllers.notification_controller import (
    create_notification_controller)


notification_app = Blueprint("notification_app", __name__)

@notification_app.route("/api/notifications", methods=["POST"])
def create_notification():
    data = request.get_json()
    userId = data["userId"]
    username = data["username"]
    text = data["text"]
    createdAt = data["createdAt"]
    type = data["type"]

    if data is None or data == {}:
        return jsonify({"message": "Data is required"}), 400

    if not userId or not username or not text or not createdAt or not type:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        notification_id = create_notification_controller(userId, username, text, createdAt, type)
        return jsonify({"notification_id": notification_id}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500
