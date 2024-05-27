import os
from flask import Flask
import mongomock
import pytest
from models.User import User
from models.build.UserBuilder import UserBuilder
from flask_jwt_extended import JWTManager
from unittest.mock import patch
from bson import ObjectId


import warnings

warnings.filterwarnings("ignore")



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
        mock_get_user.return_value = UserBuilder.anUser("existing_user", "existing@gmail.com", "image_url").now()
        mock_create_user.return_value = 0

        # Exercise
        response = client.post("/api/users",
                               json=UserBuilder.anUser("test_user", "test@gmail.com", "image_url").now(),
                               headers={"content-type": "application/json"})

        # Verify
        assert response.status_code == 400

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


    @patch.object(User, 'get_user_by_email_model')
    def test_login_with_wrong_password(self, mock_get_user, client):
        # Setup
        user_data = UserBuilder.anUser("test_user", "test@gmail.com", "image_url").now()
        mock_get_user.return_value = user_data

        # Exercise
        response = client.post("/api/login",
                               json={"email": user_data["email"], "password": "wrong_password"},
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


###################################################### TESTES UNITÁRIOS ##############################################################



@pytest.fixture
def mock_db():
    client = mongomock.MongoClient()
    mock_db = client.db
    with patch('models.Post.db', mock_db):
        yield mock_db

@pytest.fixture
def post_model(mock_db):
    with patch('models.User.db', mock_db):
        yield User

def test_create_user(post_model, mock_db):
    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"
    user_id = post_model.create_user_model(username, email, image_url, password)
    assert user_id is not None

def test_get_user_by_email(post_model, mock_db):
    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"
    user_id = post_model.create_user_model(username, email, image_url, password)

    # Simula a inserção do usuário no banco de dados
    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image_url,
        "password": password
    })

    user = post_model.get_user_by_email_model(email)
    assert user is not None

def test_get_user_by_email_not_found(post_model, mock_db):
    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"
    user_id = post_model.create_user_model(username, email, image_url, password)

    # Simula a inserção do usuário no banco de dados
    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image_url,
        "password": password
    })

    user = post_model.get_user_by_email_model("email_not_found")
    assert user is None

def test_get_user_by_username(post_model, mock_db):
    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"
    user_id = post_model.create_user_model(username, email, image_url, password)

    # Simula a inserção do usuário no banco de dados
    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image_url,
        "password": password
    })

    user = post_model.get_user_by_username_model(username)
    assert user is not None

def test_get_user_by_username_not_found(post_model, mock_db):
    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"
    user_id = post_model.create_user_model(username, email, image_url, password)

    # Simula a inserção do usuário no banco de dados
    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image_url,
        "password": password
    })

    user = post_model.get_user_by_username_model("username_not_found")
    assert user is False

def test_get_all_users(post_model, mock_db):
    mock_db.users.delete_many({})

    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"

    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image_url,
        "password": password
    })

    users = post_model.get_all_users()
    assert len(users) == 1
    assert users[0]["username"] == username
    assert users[0]["email"] == email
    assert users[0]["image_url"] == image_url
    assert users[0]["password"] == password


def test_get_all_posts_from_user(post_model, mock_db):
    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"
    user_id = post_model.create_user_model(username, email, image_url, password)

    # Simula a inserção do usuário no banco de dados
    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image_url,
        "password": password
    })

    posts = post_model.get_all_posts_from_user(user_id)
    assert len(posts) == 0

def test_get_posts_liked_by_user(post_model, mock_db):
    username = "username"
    email = "email"
    image_url = "image_url"
    password = "password"
    user_id = post_model.create_user_model(username, email, image_url, password)

    # Simula a inserção do usuário no banco de dados
    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image_url,
        "password": password
    })

    liked_posts = post_model.get_posts_liked_by_user_model(user_id)
    assert len(liked_posts) == 0

def test_get_user_by_id(post_model, mock_db):
    username = "username"
    email = "email"
    image = "image_url"
    password = "password"

    inserted_user = {
        "username": username,
        "email": email,
        "image": image,
        "password": password
    }
    mock_db.users.insert_one(inserted_user)

    user = post_model.get_user_by_id_model(ObjectId(inserted_user["_id"]))
    assert user is not None
    assert user["username"] == username
    assert user["email"] == email
    assert user["image"] == image
    assert user["password"] == password
    assert user["_id"] == str(inserted_user["_id"]) 



def test_get_user_by_id_not_found(post_model, mock_db):
    username = "username"
    email = "email"
    image = "image"
    password = "password"

    # Simula a inserção do usuário no banco de dados
    mock_db.users.insert_one({
        "username": username,
        "email": email,
        "image_url": image,
        "password": password
    })

    user = post_model.get_user_by_id_model(ObjectId())
    assert user is None


