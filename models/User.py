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
            "favorites":[],
            "liked_posts":[],
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
        result = users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": updated_fields})
        return result
    
    @staticmethod
    def get_followers_model(user_id):
        users_collection = db.users
        followers = users_collection.find({"followers": user_id})
        return list(followers)
    
    @staticmethod
    def get_following_model(user_id):
        users_collection = db.users
        following = users_collection.find({"following": user_id})
        return list(following)
    
    @staticmethod
    def delete_account_model(user_id):
        users_collection = db.users
        result = users_collection.find_one_and_delete({"_id": ObjectId(user_id)})
        return result
    

    def add_like_to_post(user_id, post_id):
        users_collection = db.users
        user = users_collection.find_one({"_id": ObjectId(user_id)}, {"liked_posts": 1})

        if user is None:
            return False

        liked_posts = user.get("liked_posts", [])
        if post_id not in liked_posts:
            liked_posts.append(post_id)
            users_collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"liked_posts": liked_posts}})
            return True
        else:
            users_collection.update_one({"_id": ObjectId(user_id)}, {"$pull": {"liked_posts": post_id}})
            return False

    def add_new_field_to_all_users(new_field_name):
        users_collection = db.users
        result = users_collection.update_many({}, {"$set": {new_field_name: []}})
        return result
