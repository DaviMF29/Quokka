
from controllers.notification_controller import create_notification_controller
from controllers.user_controller import get_userId_by_username_controller


def create_notification_async(userId, mentioned_username, post_text, createdAt):
    recipientId = get_userId_by_username_controller(mentioned_username)
    create_notification_controller(userId, recipientId, post_text, createdAt, "post", False)