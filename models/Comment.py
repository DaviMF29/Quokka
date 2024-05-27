from pymongo import MongoClient
from bson import ObjectId
import os

client = MongoClient(os.getenv("MONGODB_URI"))
db_name = "redesocial"
db = client[db_name]


class Comment:

    @staticmethod
    def create_comment_model(postId, userId, username, text, createdAt):
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


    def get_comments_model(comment_id):
        comment_collection = db.comments
        comment = comment_collection.find_one({"_id": ObjectId(comment_id)})
        comment["_id"] = str(comment["_id"])
        return comment