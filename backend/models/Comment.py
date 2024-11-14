from pymongo import MongoClient
from bson import ObjectId
import os

client = MongoClient(os.getenv("MONGODB_URI"))
db_name = "redesocial"
db = client[db_name]


class Comment:


    @staticmethod
    def create_comment_model(postId, userId, username, text, createdAt):
        fields = {
            "text": text,
            "username": username,
            "userId": userId,
            "postId": postId
        }

        for field_name, field_value in fields.items():
            if not field_value:
                raise ValueError(f"Invalid input: {field_name.capitalize()} cannot be empty")
            if field_name in ["userId", "postId"] and not ObjectId.is_valid(field_value):
                raise ValueError(f"Invalid input: {field_name.capitalize()} is not a valid ObjectId")

        comment_collection = db.comments
        new_comment ={
            "postId": postId,
            "userId": userId,
            "username": username,
            "text": text,
            "createdAt": createdAt
        }
        
        result = comment_collection.insert_one(new_comment)
        return str(result.inserted_id)

  

    def delete_comment_model(comment_id):
        comment_collection = db.comments
        result = comment_collection.delete_one({"_id": comment_id})
        if result and result.deleted_count == 1:
            return str(comment_id)
        return None


    @staticmethod
    def get_comments_model(comment_id):
        comment_collection = db.comments
        if comment_id is None or not ObjectId.is_valid(comment_id):
            raise ValueError("Invalid input: comment_id must be a valid ObjectId")
        comment = comment_collection.find_one({"_id": ObjectId(comment_id)})
        if comment:
            comment["_id"] = str(comment["_id"])
        return comment
