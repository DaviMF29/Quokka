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