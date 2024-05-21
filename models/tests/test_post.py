import os
import warnings
from flask import Flask
from flask_jwt_extended import JWTManager
import pytest
from bson import ObjectId
from models.build.PostBuilder import PostBuilder
from models.Post import Post
from unittest.mock import patch
from flask_jwt_extended import create_access_token
from dotenv import load_dotenv

load_dotenv()

warnings.filterwarnings("ignore")

@pytest.fixture
def app():
    import routes.post_routes
    app = Flask(__name__)
    app.config.update({
        "TESTING": True,
        "MONGO_URI": "mongomock://localhost",  # Use mongomock
        "JWT_SECRET_KEY": os.getenv("SECRET_KEY"),
        "JWT_TOKEN_LOCATION": ["headers"],
    })
    jwt = JWTManager(app)
    app.register_blueprint(routes.post_routes.post_app)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

class TestPostRoutes:

    @patch.object(Post, "create_post_model")
    @patch("bson.ObjectId.is_valid", return_value=True)
    @patch("middleware.global_middleware.verify_user", lambda x: x)  # Ignora a verificação de usuário
    def test_create_post(self, mock_create_post,mock_is_valid, client, app):
        mock_create_post.return_value = 125
        mock_is_valid.return_value = True
        with app.app_context():
            token = create_access_token(identity="user_id")

            response = client.post("/api/posts",
                                   json=PostBuilder.anPost(str(ObjectId()), "username", "Test post", "2024-05-09T12:00:00Z").now(),
                                   headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"})

            assert response.status_code == 201

    @patch.object(Post, "create_post_model")
    @patch("bson.ObjectId.is_valid", return_value=True)
    def test_create_post_with_invalid_userId(self, mock_is_valid, mock_create_post, client, app):
        mock_create_post.return_value = 125
        mock_is_valid.return_value = True
        with app.app_context():
            token = create_access_token(identity="user_id")

            response = client.post("/api/posts",
                                   json=PostBuilder.anPost(str(ObjectId()), "username", "Test post", "2024-05-09T12:00:00Z").now(),
                                   headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"})

            assert response.status_code == 400

    @patch.object(Post, "create_post_model")
    @patch("bson.ObjectId.is_valid", return_value=True)
    def test_create_post_missing_fields(self, mock_is_valid, mock_create_post, client, app):
        mock_create_post.return_value = 1
        with app.app_context():
            token = create_access_token(identity="user_id")

            response = client.post("/api/posts",
                                   json=PostBuilder.anPost(str(ObjectId()), "", "", "").now(),
                                   headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"})

            assert response.status_code == 400

    @patch.object(Post, "create_post_model")
    @patch("bson.ObjectId.is_valid", return_value=True)
    def test_create_post_invalid_username(self, mock_is_valid, mock_create_post, client, app):
        mock_create_post.return_value = 1
        with app.app_context():
            token = create_access_token(identity="user_id")

            response = client.post("/api/posts",
                                   json=PostBuilder.anPost(str(ObjectId())," ", "Test post", "2024-05-09T12:00:00Z").now(),
                                   headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"})

            assert response.status_code == 400
