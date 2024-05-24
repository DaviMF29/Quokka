from models.Notification import Notification
from middleware.global_middleware import verify_user


typesOfNotifications = ["like", "comment", "post", "follow", "mention",]


def create_notification_controller(userId, username, text, createdAt, type, seen):
    verify_user(userId)
    if type not in typesOfNotifications:
        raise Exception("Invalid type of notification")
    notification = Notification(userId, username, text, createdAt, type, seen)
    return notification.create_notification_model()

def get_notifications_by_userId_controller(userId):
    verify_user(userId)
    return Notification.get_notifications_by_userId(userId)

def delete_notification_by_id_controller(userId,notificationId):
    print(userId,notificationId)
    return Notification.delete_notification_by_id(userId,notificationId)

def delete_all_notifications_by_userId_controller(userId):
    verify_user(userId)
    return Notification.delete_all_notifications_by_userId(userId)
