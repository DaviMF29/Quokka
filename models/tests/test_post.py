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
import mongomock
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
    jwt = JWTManager(app)
    app.register_blueprint(routes.post_routes.post_app)
    return app

@pytest.fixture
def client(app):
    return app.test_client()

class TestPostRoutes:

    # @patch.object(Post, "create_post_model")
    # @patch("bson.ObjectId.is_valid", return_value=True)
    # @patch("middleware.global_middleware.verify_user", lambda x: x)  # Ignora a verificação de usuário
    # def test_create_post(self, mock_create_post,mock_is_valid, client, app):
    #     mock_create_post.return_value = 125
    #     mock_is_valid.return_value = True
    #     with app.app_context():
    #         token = create_access_token(identity="user_id")

    #         response = client.post("/api/posts",
    #                                json=PostBuilder.anPost(str(ObjectId()), "username", "Test post", "2024-05-09T12:00:00Z").now(),
    #                                headers={"Authorization": "Bearer " + token, "Content-Type": "application/json"})

    #         assert response.status_code == 201

    @patch.object(Post, "create_post_model")
    @pytest.mark.filterwarnings("ignore::DeprecationWarning")
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


###################################################### TESTES UNITÁRIOS ##############################################################



@pytest.fixture
def mock_db():
    client = mongomock.MongoClient()
    mock_db = client.db
    with patch('models.Post.db', mock_db):
        yield mock_db

@pytest.fixture
def post_model(mock_db):
    with patch('models.Post.db', mock_db):
        yield Post

def test_create_post(post_model, mock_db):
    userId = ObjectId()
    username = "username"
    text = "text"
    createdAt = "2024-05-09T12:00:00Z"

    response_id = post_model.create_post_model(
        userId, username, text, createdAt
    )

    assert response_id is not None


def test_find_all_posts_service(post_model, mock_db):
    mock_db.posts.insert_many([
        {"title": "Post 1", "content": "Content 1", "user_id": "user_id_1", "likes": 5},
        {"title": "Post 2", "content": "Content 2", "user_id": "user_id_2", "likes": 10}
    ])
    posts = post_model.get_all_posts()
    assert len(posts) == 2
    assert posts[0]["title"] == "Post 1"
    assert posts[1]["title"] == "Post 2"


def test_get_post(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.\nWith a new line.",
        "user_id": "test_user",
        "comments": [
            {
                "comment_id": ObjectId(),
                "user_id": "test_user",
                "content": "This is a test comment."
            }
        ]
    }).inserted_id
    
    post = Post.get_post_by_id_model(post_id)
    assert post is not None
    assert post["title"] == "Test Post"
    assert post["content"] == "This is a test post.<br>With a new line."
    assert post["user_id"] == "test_user"
    assert len(post["comments"]) == 1
    assert post["comments"][0]["content"] == "This is a test comment."
    assert post["comments"][0]["user_id"] == "test_user"

def test_update_post(mock_db):
    comment_id = ObjectId()
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user",
        "comments": [
            {
                "comment_id": comment_id,
                "user_id": "test_user",
                "content": "This is a test comment."
            }
        ]
    }).inserted_id
    
    updated_fields = {"title": "Updated Test Post", "content": "This is an updated test post."}
    response, status_code = Post.update_post_by_id_model(post_id, updated_fields)
    assert status_code == 200
    assert response["message"] == "Post updated successfully!"
    
    updated_post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert updated_post["title"] == "Updated Test Post"
    assert updated_post["content"] == "This is an updated test post."


def test_delete_post(mock_db):
    post_id = mock_db.posts.insert_one({
        "title": "Test Post",
        "content": "This is a test post.",
        "user_id": "test_user"
    }).inserted_id
    
    response, status_code = Post.delete_post_by_id_model(post_id)
    assert status_code == 200
    assert response["message"] == "Comentário removido com sucesso!"
    
    post = mock_db.posts.find_one({"_id": ObjectId(post_id)})
    assert post is None

def test_find_all_posts(post_model, mock_db):
    mock_db.posts.insert_many([
        {"title": "Post 1", "content": "Content 1", "user_id": "user_id_1", "likes": 5},
        {"title": "Post 2", "content": "Content 2", "user_id": "user_id_2", "likes": 10}
    ])
    posts = post_model.get_all_posts()
    assert len(posts) == 2
    assert posts[0]["title"] == "Post 1"
    assert posts[1]["title"] == "Post 2"

def test_find_all_posts_empty(post_model, mock_db):
    posts = post_model.get_all_posts()
    assert len(posts) == 0

    