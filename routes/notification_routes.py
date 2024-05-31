from flask import request, jsonify, Blueprint
from flask_jwt_extended import get_jwt_identity, jwt_required

from controllers.notification_controller import (
    create_notification_controller,get_notifications_by_userId_controller,
    delete_notification_by_id_controller,delete_all_notifications_by_userId_controller)


notification_app = Blueprint("notification_app", __name__)

@notification_app.route("/api/notifications", methods=["POST"])
def create_notification():
    data = request.get_json()
    senderId= data["senderId"]
    recipientId = data["recipientId"]
    text = data["text"]
    createdAt = data["createdAt"]
    type = data["type"]
    seen = data.get("seen", False)
    if data is None or data == {}:
        return jsonify({"message": "Data is required"}), 400

    if not senderId or not recipientId or not text or not createdAt or not type:
        return jsonify({"message": "Missing required fields"}), 400

    try:
        notification_id = create_notification_controller(senderId,recipientId, text, createdAt, type, seen)
        return jsonify({"notification_id": notification_id}), 201
    except Exception as e:
        return jsonify({"message": str(e)}), 500

@notification_app.route("/api/notifications", methods=["GET"])
@jwt_required()
def get_notifications_by_userId():
    userId = get_jwt_identity()
    try:
        notifications = get_notifications_by_userId_controller(userId)
        return jsonify(notifications), 200
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@notification_app.route("/api/notifications/<userId>/<notificationId>", methods=["DELETE"])
def delete_notification_by_id(userId,notificationId):
    try:
        result = delete_notification_by_id_controller(userId,notificationId)
        if result:
            return jsonify({"message": "Notification deleted"}), 200
        return jsonify({"message": "Notification not found"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500
    
@notification_app.route("/api/notifications/<userId>", methods=["DELETE"])
def delete_all_notifications_by_userId(userId):
    try:
        result = delete_all_notifications_by_userId_controller(userId)
        if result:
            return jsonify({"message": "Notifications deleted"}), 200
        return jsonify({"message": "Notifications not found"}), 404
    except Exception as e:
        return jsonify({"message": str(e)}), 500