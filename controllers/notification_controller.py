from models.Notification import Notification

def create_notification_controller(userId, username, text, createdAt, type):
    return Notification.create_notification_model(userId, username, text, createdAt, type)

def get_notifications_by_userId_controller(userId):
    return Notification.get_notifications_by_userId(userId)

def delete_notification_by_id_controller(notificationId):
    return Notification.delete_notification_by_id(notificationId)

def delete_all_notifications_by_userId_controller(userId):
    return Notification.delete_all_notifications_by_userId(userId)
