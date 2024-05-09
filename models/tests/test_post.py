import os
from flask import Flask
import pytest
from models.PostBuilder import PostBuilder
from models.Post import Post
from unittest.mock import patch

@pytest.fixture
def app():
    import routes.post_routes
    app = Flask(__name__)
    app.config.update({
        "TESTING": True,
    })
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
    app.register_blueprint(routes.post_routes.post_app)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

class TestPostRoutes:

    @patch.object(Post, "create_post_model")
    def test_create_post(self,mock_get_post, mock_create_post, client):
        # Setup
        mock_get_post.return_value = False
        mock_create_post.return_value = 1

        # Exercise
        response = client.post("/api/posts",
                               json=PostBuilder.anPost("123445656775dadda", "username", "Test post", "2024-05-09T12:00:00Z").now(),
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 201

    @patch.object(Post, "get_post_model")
    def test_get_post(self, mock_get_post, client):
        # Setup
        mock_get_post.return_value = {
            "id": 1,
            "userId": "test_user_id",
            "username": "test_user",
            "text": "Test post",
            "createdAt": "2024-05-09T12:00:00Z",
            "likes": 0,
            "comments": [],
            "isCode": False,
            "language": "",
            "previousPostId": None
        }

        # Exercise
        response = client.get("/api/posts/1")

        # Verify
        assert response.status_code == 200
        assert response.json["id"] == 1
        assert response.json["userId"] == "test_user_id"
        assert response.json["username"] == "test_user"
        assert response.json["text"] == "Test post"
        assert response.json["createdAt"] == "2024-05-09T12:00:00Z"
        assert response.json["likes"] == 0
        assert response.json["comments"] == []
        assert response.json["isCode"] == False
        assert response.json["language"] == ""
        assert response.json["previousPostId"] == None

    @patch.object(Post, "delete_post_by_id_model")
    def test_delete_post(self, mock_delete_post, client):
        # Setup
        mock_delete_post.return_value = 1

        # Exercise
        response = client.delete("/api/posts/663c0dc3119872a96e5d2f5b")

        # Verify
        assert response.status_code == 200
        assert response.json["message"] == "Post deleted successfully"
