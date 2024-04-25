from pymongo import MongoClient
from bson import ObjectId
import os

client = MongoClient(os.getenv("MONGODB_URI"))
db_name = "redesocial"
db = client[db_name]


class User:

    @staticmethod
    def create_user_model(email,username, hashed_password_base64):
        users_collection = db.users
        new_user = {
            "username": username,
            "email": email,
            "password": hashed_password_base64,
            "following": [],
            "followers":[],
            "favorites":[]
        }
        result = users_collection.insert_one(new_user)
        return str(result.inserted_id)

    @staticmethod
    def get_all_posts():
        users_collection = db.users
        users = users_collection.find()
        serialized_posts = []
        for user in users:
            user["_id"] = str(user["_id"])
            serialized_posts.append(user)
        return serialized_posts

    @staticmethod
    def get_user_by_username_model(username):
        users_collection = db.users
        user = users_collection.find_one({"username": username})
        return user
    
    @staticmethod
    def get_user_by_email_model(email):
        users_collection = db.users
        user = users_collection.find_one({"email": email})
        return user
    
    @staticmethod
    def get_user_by_id_model(id):
        users_collection = db.users
        user = users_collection.find_one({"_id": ObjectId(id)})
        return user
    
    @staticmethod
    def update_user(user_id, updated_fields):
        users_collection = db.users
        result = users_collection.update_many({"_id": ObjectId(user_id)}, {"$set": updated_fields})
        return result
    
    @staticmethod
    def get_followers_model(user_id):
        users_collection = db.users
        followers = users_collection.find({"following": user_id})
        return list(followers)
    
    @staticmethod
    def delete_account_model(user_id):
        users_collection = db.users
        result = users_collection.find_one_and_delete({"_id": ObjectId(user_id)})
        return result