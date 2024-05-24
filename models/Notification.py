from enum import Enum
from pymongo import MongoClient
from bson import ObjectId
import os

client = MongoClient(os.getenv("MONGODB_URI"))
db_name = "redesocial"
db = client[db_name]


class Notification:

    def __init__(self,senderId,recipientId, text, createdAt, type, seen = False):
        self.notification = {
            "senderId": senderId,
            "recipientId": recipientId,
            "text": text,
            "createdAt": createdAt,
            "type": type,
            "seen": seen
        }


    def create_notification_model(self):
        notification_collection = db.notifications
        result = notification_collection.insert_one(self.notification)
        return str(result.inserted_id)


    def get_notifications_by_userId(userId):
        notification_collection = db.notifications
        notifications = notification_collection.find({"userId": userId})
        serialized_notifications = []
        for notification in notifications:
            notification["_id"] = str(notification["_id"])
            serialized_notifications.append(notification)
        return serialized_notifications

    def delete_notification_by_id(notificationId,userId):
        notification_collection = db.notifications
        result = notification_collection.delete_one({"_id": ObjectId(notificationId), "userId": userId})
        return result.deleted_count > 0


    def delete_all_notifications_by_userId(userId):
        notification_collection = db.notifications
        result = notification_collection.delete_many({"userId": userId})
        return result.deleted_count > 0
