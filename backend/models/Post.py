from pymongo import MongoClient
from bson import ObjectId
import os
import re
import json


client = MongoClient(os.getenv("MONGODB_URI"))
db_name = "redesocial"
db = client[db_name]


class Post:

    @staticmethod
    def create_post_model(userId, username, text, isCode=False, language = None, previousPostId = None):
        posts_collection = db.posts
        new_post = {
            "userId": userId,
            "username": username,
            "text": text,
            "likes": 0,
            "comments": [],
            "isCode": isCode,
            "language": language,
            "previousPostId": previousPostId
        }
        result = posts_collection.insert_one(new_post)
        return str(result.inserted_id)


    @staticmethod
    def get_all_posts():
        posts_collection = db.posts
        posts = posts_collection.find()
        serialized_posts = []
        for post in posts:
            post["_id"] = str(post["_id"])
            serialized_posts.append(post)
        return serialized_posts

    @staticmethod
    def update_post_model(postId, update_data):
        posts_collection = db.posts
        result = posts_collection.update_one({"_id": postId}, {"$set": update_data})
        return result.modified_count > 0

    @staticmethod
    def get_post_by_username_model(username):
        posts_collection = db.posts
        post = posts_collection.find_one({"username": username})
        return post
    
    @staticmethod
    def get_post_by_id_model(userId):
        posts_collection = db.posts
        post = posts_collection.find_one({"_id": ObjectId(userId)})
        if post:
            post["_id"] = str(post["_id"])  # Convertendo o ObjectId para string
        return post

    @staticmethod
    def get_post_by_text_model(text):
        palavras = text.split()
        
        regex_palavras = '|'.join(map(re.escape, palavras))  
        regex = re.compile(regex_palavras, re.IGNORECASE)
        
        posts_collection = db.posts
        posts = posts_collection.find({"text": regex})
        
        return list(posts)
    
    @staticmethod
    def update_post_by_id_model(userId,updated_fields):
        posts_collection = db.posts
        result = posts_collection.update_many({"_id": ObjectId(userId)}, {"$set": updated_fields})
        return result

    @staticmethod
    def delete_post_by_id_model(postId):
        posts_collection = db.posts
        result = posts_collection.find_one_and_delete({"_id": ObjectId(postId)})
        return result

    @staticmethod
    def delete_comment_from_post_model(postId, commentId):           #ja tentei com delete_one
        posts_collection = db.posts
        result = posts_collection.update_one(
            {"_id": ObjectId(postId)},
            {"$pull": {"comments": {"_id": commentId}}}
        )
        
        return result.modified_count > 0
