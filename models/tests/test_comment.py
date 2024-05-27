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


