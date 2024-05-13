from flask import request, jsonify, Blueprint

from controllers.notification_controller import (
    create_notification_controller,get_notifications_by_userId_controller,
    delete_notification_by_id_controller,delete_all_notifications_by_userId_controller)


notification_app = Blueprint("notification_app", __name__)

@notification_app.route("/api/notifications", methods=["POST"])
def create_notification():
    data = request.get_json()
    userId = data["userId"]
    username = data["username"]
    text = data["text"]
    createdAt = data["createdAt"]
    type = data["type"]
    seen = data.get("seen", False)
    if data is None or data == {}:
        return jsonify({"message": "Data is required"}), 400

    if not userId or not username or not text or not createdAt or not type:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        notification_id = create_notification_controller(userId, username, text, createdAt, type, seen)
        return jsonify({"notification_id": notification_id}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@notification_app.route("/api/notifications/<userId>", methods=["GET"])
def get_notifications_by_userId(userId):
    try:
        notifications = get_notifications_by_userId_controller(userId)
        return jsonify(notifications), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
