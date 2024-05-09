import os
from flask import Flask
import pytest
import mongomock
from models.User import User
from models.UserBuilder import UserBuilder
from flask_jwt_extended import JWTManager
from unittest.mock import patch
import jwt


@pytest.fixture
def app():
    import routes.user_routes
    import routes.auth_routes
    app = Flask(__name__)
    app.config.update({
        "TESTING": True,
    })
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
    jwt = JWTManager(app)
    app.register_blueprint(routes.user_routes.users_app)
    app.register_blueprint(routes.auth_routes.auth_app)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

class TestUserBuilder:

    @patch.object(User, "create_user_model")
    @patch.object(User, 'get_user_by_email_model')
    def test_create_user_without_email(self, mock_get_user, mock_create_user, client):
        # Setup
        mock_get_user.return_value = False
        mock_create_user.return_value = 1

        # Exercise
        response = client.post("/api/users",
                               json=UserBuilder.anUser("test_user","", "image_url").now(),
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 400

    @patch.object(User, "create_user_model")
    @patch.object(User, 'get_user_by_email_model')
    def test_create_with_registered_email(self, mock_get_user, mock_create_user, client):
        # Setup
        mock_get_user.return_value = UserBuilder.anUser("existing_user", "existing@example.com", "image_url").now()
        mock_create_user.return_value = 0

        # Exercise
        response = client.post("/api/users",
                               json=UserBuilder.anUser("test_user", "test@example.com", "image_url").now(),
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 401

    @patch.object(User, "create_user_model")
    @patch.object(User, 'get_user_by_email_model')
    def test_create_with_valid_email(self, mock_get_user, mock_create_user, client):
        # Setup
        mock_get_user.return_value = False
        mock_create_user.return_value = 0

        # Exercise
        response = client.post("/api/users",
                               json=UserBuilder.anUser("test_user", "test@gmail.com", "image_url").now(),
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 201

    @patch.object(User, "create_user_model")
    @patch.object(User, 'get_user_by_email_model')
    def test_create_without_valid_email(self, mock_get_user, mock_create_user, client):
        # Setup
        mock_get_user.return_value = False
        mock_create_user.return_value = 0

        # Exercise
        response = client.post("/api/users",
                               json=UserBuilder.anUser("test_user", "test@exemple.com", "image_url").now(),
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 401



    @patch.object(User, 'get_user_by_email_model')
    def test_login_with_correct_credentials(self, mock_get_user, client):
        # Setup
        user_data = UserBuilder.anUser("test_user", "test@gmail.com", "image_url").now()
        mock_get_user.return_value = user_data

        # Exercise
        response = client.post("/api/login",
                            json={"email": user_data["email"], "password": "Teste123"},
                            headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 200
        assert "access_token" in response.json


    @patch.object(User, 'get_user_by_email_model')
    def test_login_with_wrong_password(self, mock_get_user, client):
        # Setup
        user_data = UserBuilder.anUser("test_user", "test@gmail.com", "image_url").now()
        mock_get_user.return_value = user_data

        # Exercise
        response = client.post("/api/login",
                               json={"username": user_data["username"], "email": user_data["email"], "password": "wrong_password"},
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 401

    @patch.object(User, 'get_user_by_email_model')
    def test_login_with_empty_credentials(self, mock_get_user, client):
        # Setup
        user_data = UserBuilder.anUser("", "", "").now()
        mock_get_user.return_value = user_data

        # Exercise
        response = client.post("/api/login",
                               json={"password": "Teste123"},
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 400

        # Exercise
        response = client.post("/api/login",
                               json={"email": "email@email.com"},
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 400
