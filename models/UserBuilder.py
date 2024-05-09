import bcrypt
import base64

class UserBuilder:
    def __init__(self):
        self.user = {
            "username": "",
            "email": "",
            "image": "",
            "password": "",
            "following": [],
            "followers": [],
            "favorites": [],
            "liked_posts": [],
            "posts": []
        }

    @staticmethod
    def anUser(username, email, image):
        builder = UserBuilder()

        password = "Teste123"
        hashed_password = bcrypt.hashpw(password.encode(), bcrypt.gensalt(10))
        hashed_password_base64 = base64.b64encode(hashed_password).decode()

        builder.user['username'] = username
        builder.user['email'] = email
        builder.user['image'] = image
        builder.user['password'] = hashed_password_base64

        return builder

    def now(self):
        return self.user
