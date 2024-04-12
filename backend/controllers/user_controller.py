from models.User import User
import bcrypt
import base64
from middleware.global_middleware import (
    verify_email_registered)

def create_user_controller(email,username, password):
    verify_email_registered(email)
    hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt(10))
    hashed_password_base64 = base64.b64encode(hashed_password).decode()
    user_id = User.create_user_model(email,username, hashed_password_base64)
    return {"id": user_id, "message": f"User {username} created"}, 201

