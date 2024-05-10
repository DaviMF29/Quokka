from pymongo import MongoClient
from bson import ObjectId
import os

client = MongoClient(os.getenv("MONGODB_URI"))
db_name = "redesocial"
db = client[db_name]


class User:

    @staticmethod
    def create_user_model(email,username,image, hashed_password_base64):
        users_collection = db.users
        new_user = {
            "username": username,
            "email": email,
            "image":image,
            "password": hashed_password_base64,
            "following": [],
            "followers":[],
            "favorites":[],
            "liked_posts":[],
            "posts": []
        }
        result = users_collection.insert_one(new_user)
        return str(result.inserted_id)

    @staticmethod
    def get_all_users():
        users_collection = db.users
        users = users_collection.find()
        serialized_users = []
        for user in users:
            user["_id"] = str(user["_id"])
            serialized_users.append(user)
        return serialized_users

    @staticmethod
    def get_all_posts_from_user(user_id):
        users_collection = db.users
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        posts = user.get("posts", [])
        return posts

    @staticmethod
    def get_posts_liked_by_user_model(user_id):
        users_collection = db.users
        user = users_collection.find_one({"_id":ObjectId(user_id)})
        liked_posts = user.get("liked_posts",[])
        return liked_posts
    
    @staticmethod
    def get_user_by_username_model(username):
        users_collection = db.users
        user = users_collection.find_one({"username": username})
        user["_id"] = str(user["_id"])
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
        result = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": updated_fields})
        return result
    
    @staticmethod
    def update_many_user(query, updated_fields):
        users_collection = db.users
        result = users_collection.update_many(query, {"$pull": updated_fields})
        return result

    @staticmethod
    def get_followers_model(user_id):
        users_collection = db.users
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            followers = user.get("followers", [])
            return followers
        else:
            return []
    
    @staticmethod
    def get_following_model(user_id):
        users_collection = db.users
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            following = user.get("following", [])
            return following
        else:
            return []

    @staticmethod
    def get_favorite_posts_model(user_id):
        users_collection = db.users
        user = users_collection.find_one({"_id": ObjectId(user_id)})
        if user:
            favorites = user.get("favorites", [])
            return favorites
        else:
            return []
        
    @staticmethod
    def delete_account_model(user_id):
        users_collection = db.users
        result = users_collection.find_one_and_delete({"_id": ObjectId(user_id)})
        return result
    
    def add_new_field_to_all_users(new_field_name):
        users_collection = db.users
        result = users_collection.update_many({}, {"$set": {new_field_name: []}})
        return result
