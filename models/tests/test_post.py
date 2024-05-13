import os
import warnings
from flask import Flask
from flask_jwt_extended import JWTManager
import pytest
from models.build.PostBuilder import PostBuilder
from models.Post import Post
from unittest.mock import patch
from flask_jwt_extended import create_access_token
from flask import current_app
from dotenv import load_dotenv
load_dotenv()


warnings.filterwarnings("ignore")


@pytest.fixture
def app():
    import routes.post_routes
    app = Flask(__name__)
    app.config.update({
        "TESTING": True,
    })
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    jwt = JWTManager(app)
    app.register_blueprint(routes.post_routes.post_app)
    return app


@pytest.fixture
def client(app):
    return app.test_client()

class TestPostRoutes:

    @patch.object(Post, "create_post_model")
    def test_create_post(self, mock_create_post, client, app):
        # Setup
        mock_create_post.return_value = 125

        with app.app_context():
            # Gerar um token JWT válido para incluir no cabeçalho da requisição
            token = create_access_token(identity="user_id")

            # Exercise
            response = client.post("/api/posts",
                                   json=PostBuilder.anPost("1", "username", "Test post", "2024-05-09T12:00:00Z").now(),
                                   headers={"Authorization": "Bearer " + token, "content-type": "application/json"})

            # Verify
            assert response.status_code == 201

    @patch.object(Post, "create_post_model")
    def test_create_post_with_invalid_userId(self, mock_create_post, client, app):
        # Setup
        mock_create_post.return_value = 125

        with app.app_context():
            # Gerar um token JWT válido para incluir no cabeçalho da requisição
            token = create_access_token(identity="user_id")

            # Exercise
            response = client.post("/api/posts",
                                   json=PostBuilder.anPost("1", "username", "Test post", "2024-05-09T12:00:00Z").now(),
                                   headers={"Authorization": "Bearer " + token, "content-type": "application/json"})

            # Verify
            assert response.status_code == 400

        
    @patch.object(Post, "create_post_model")
    def test_create_post_missing_fields(self, mock_create_post, client,app):
        # Setup
        mock_create_post.return_value = 1
        with app.app_context():
            token = create_access_token(identity="userId")

            # Exercise
            response = client.post("/api/posts",
                                json=PostBuilder.anPost("","","","").now(),
                                headers={"Authorization": "Bearer " + token,"content-type": "application/json"})

            # Verify
            assert response.status_code == 400

    @patch.object(Post, "create_post_model")
    def test_create_post_invalid_user_id(self, mock_create_post, client,app):
        # Setup
        mock_create_post.return_value = 1
        with app.app_context():
            token = create_access_token(identity="userId")

            # Exercise
            response = client.post("/api/posts",
                                json=PostBuilder.anPost("", "username", "Test post", "2024-05-09T12:00:00Z").now(),
                                headers={"Authorization": "Bearer " + token,"content-type": "application/json"})

            # Verify
            assert response.status_code == 400

    @patch.object(Post, "create_post_model")
    def test_create_post_invalid_username(self, mock_create_post, client,app):
        # Setup
        mock_create_post.return_value = 1
        with app.app_context():
            token = create_access_token(identity="userId")
            # Exercise
            response = client.post("/api/posts",
                                json=PostBuilder.anPost("123445656775dadda", "", "Test post", "2024-05-09T12:00:00Z").now(),
                                headers={"Authorization": "Bearer " + token,"content-type": "application/json"})

            # Verify
            assert response.status_code == 400


