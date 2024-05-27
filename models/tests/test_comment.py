import pytest
from bson import ObjectId
from models.Comment import Comment
import mongomock
from unittest.mock import patch

@pytest.fixture
def mock_db():
    client = mongomock.MongoClient()
    mock_db = client.db
    yield mock_db
    client.close()

@pytest.fixture
def comment_model(mock_db):
    with patch('models.Comment.db', mock_db):
        yield Comment

def test_add_comment(comment_model, mock_db):
    postId = ObjectId()
    userId = ObjectId()
    username = "test_username"
    text = "This is a test comment."
    createdAt = "2024-05-09T12:00:00Z"
    
    comment_id = comment_model.create_comment_model(
        postId, userId, username, text, createdAt
    )
    assert comment_id is not None

def test_delete_comment(comment_model, mock_db):
    commentId = mock_db.comments.insert_one({
        "postId": ObjectId(),
        "userId": ObjectId(),
        "username": "test_username",
        "text": "This is a test comment.",
        "createdAt": "2024-05-09T12:00:00Z"
    }).inserted_id

    response_id = comment_model.delete_comment_model(commentId)
    assert response_id == str(commentId)

def test_get_comment(comment_model, mock_db):
    comment_id = mock_db.comments.insert_one({
        "postId": ObjectId(),
        "userId": ObjectId(),
        "username": "test_username",
        "text": "This is a test comment.",
        "createdAt": "2024-05-09T12:00:00Z"
    }).inserted_id

    comment = comment_model.get_comments_model(comment_id)
    assert comment is not None
    assert comment["username"] == "test_username"
    assert comment["text"] == "This is a test comment."
    assert comment["createdAt"] == "2024-05-09T12:00:00Z"

def test_get_comment_not_found(comment_model):
    comment_id = "invalid_id"

    with pytest.raises(ValueError) as e:
        comment_model.get_comments_model(comment_id)

    assert str(e.value) == "Invalid input: comment_id must be a valid ObjectId"

def test_delete_comment_not_found(comment_model):
    comment_id = ObjectId()
    response_id = comment_model.delete_comment_model(comment_id)
    assert response_id is None

def test_add_comment_invalid_post_id(comment_model):
    postId = "invalid_id"
    userId = ObjectId()
    username = "test_username"
    text = "This is a test comment."
    createdAt = "2024-05-09T12:00:00Z"
    
    with pytest.raises(ValueError) as e:
        comment_model.create_comment_model(postId, userId, username, text, createdAt)

    assert "Invalid input: PostId is not a valid ObjectId".lower() in str(e.value).lower()   #só funcinou usando o "in" pois o erro é gerado em uma linha diferente

def test_add_comment_invalid_user_id(comment_model):
    postId = ObjectId()
    userId = "invalid_id"
    username = "test_username"
    text = "This is a test comment."
    createdAt = "2024-05-09T12:00:00Z"
    
    with pytest.raises(ValueError) as e:
        comment_model.create_comment_model(postId, userId, username, text, createdAt)

def test_add_comment_invalid_username(comment_model):
    postId = ObjectId()
    userId = ObjectId()
    username = ""
    text = "This is a test comment."
    createdAt = "2024-05-09T12:00:00Z"
    
    with pytest.raises(ValueError) as e:
        comment_model.create_comment_model(postId, userId, username, text, createdAt)

    assert str(e.value) == "Invalid input: Username cannot be empty"


def test_add_comment_invalid_text(comment_model):
    postId = ObjectId()
    userId = ObjectId()
    username = "test_username"
    text = ""
    createdAt = "2024-05-09T12:00:00Z"
    
    comment_id = comment_model.create_comment_model(
        postId, userId, username, text, createdAt
    )
    with pytest.raises(ValueError) as e:
        comment_model.create_comment_model(postId, userId, username, text, createdAt)

    assert str(e.value) == "Invalid input"

def test_add_comment_invalid_text(comment_model):
    postId = ObjectId()
    userId = ObjectId()
    username = "test_username"
    text = ""
    createdAt = "2024-05-09T12:00:00Z"
    
    with pytest.raises(ValueError) as e:
        comment_model.create_comment_model(postId, userId, username, text, createdAt)

    assert str(e.value) == "Invalid input: Text cannot be empty"

def test_delete_comment_invalid_id(comment_model):
    comment_id = "invalid_id"
    response_id = comment_model.delete_comment_model(comment_id)
    assert response_id is None





