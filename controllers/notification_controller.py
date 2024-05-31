from models.Notification import Notification
from middleware.global_middleware import verify_user
from models.Email import sendEmail
from utils.user_posts import get_email_from_user
typesOfNotifications = ["like", "comment", "post", "follow", "mention",]


def create_notification_controller(senderId,recipientId, text, createdAt, type, seen):
    if type not in typesOfNotifications:
        raise Exception("Invalid type of notification")
    notification_id = Notification.create_notification_model(senderId,recipientId, text, createdAt, type, seen)
    #recipient = get_email_from_user(recipientId)
    #sendEmail(type, recipient, text)
    return notification_id

def get_notifications_by_userId_controller(userId):
    verify_user(userId)
    notifications = Notification.get_notifications_by_userId(userId)
    arrNotifications = []
    for notification in notifications:
        if notification["senderId"] != notification["recipientId"]:
            arrNotifications.append(notification)
    return arrNotifications
            

def delete_notification_by_id_controller(userId,notificationId):
    return Notification.delete_notification_by_id(userId,notificationId)

def delete_all_notifications_by_userId_controller(userId):
    verify_user(userId)
    return Notification.delete_all_notifications_by_userId(userId)
