from pymongo import MongoClient
from bson import ObjectId
import os
import re

client = MongoClient(os.getenv("MONGODB_URI"))
db_name = "redesocial"
db = client[db_name]


class Post:

    @staticmethod
    def create_post_model(userId, username, text,createdAt,images = [], isCode=False, language = None):
        posts_collection = db.posts
        new_post = {
            "userId": userId,
            "username": username,
            "text": text,
            "createdAt": createdAt,
            "images": images,
            "likes": 0,
            "comments": [],
            "isCode": isCode,
            "language": language,
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
            if "text" in post and post["text"] is not None and "\n" in post["text"]:
                post["text"] = post["text"].replace("\n", "<br>") 
            serialized_posts.append(post)
        return serialized_posts


    @staticmethod
    def update_post_model(postId, update_data):
        posts_collection = db.posts
        result = posts_collection.update_one({"_id": ObjectId(postId)}, {"$set": update_data})
        return result.modified_count > 0

    @staticmethod
    def get_all_posts_from_user_model(userId):
        posts_collection = db.posts
        posts = posts_collection.find({"userId": userId})
        serialized_posts = []
        for post in posts:
            post["_id"] = str(post["_id"])
            post["text"] = post["text"].replace("\n", "<br>")    #para a quebra de linha
            serialized_posts.append(post)
        return serialized_posts

    @staticmethod
    def get_post_by_username_model(username):
        posts_collection = db.posts
        post = posts_collection.find_one({"username": username})
        post["text"] = post["text"].replace("\n", "<br>")    #para a quebra de linha

        return post

    @staticmethod
    def get_userId_from_post_model(postId):
        posts_collection = db.posts
        post = posts_collection.find_one({"_id": ObjectId(postId)})
        return post.get("userId")

    @staticmethod
    def get_text_from_post_model(postId):
        posts_collection = db.posts
        post = posts_collection.find_one({"_id": ObjectId(postId)})
        return post.get("text")

    @staticmethod
    def get_comments_from_post_model(postId):
        posts_collection = db.posts
        post = posts_collection.find_one({"_id": ObjectId(postId)})
        comments = post.get("comments", [])
        return comments

    @staticmethod
    def get_post_by_id_model(post_id):
        posts_collection = db.posts
        post = posts_collection.find_one({"_id": ObjectId(post_id)})
        if post:
            post["_id"] = str(post["_id"])  
            if "content" in post:
                post["content"] = post["content"].replace("\n", "<br>")    # para a quebra de linha
        return post

    @staticmethod
    def get_post_by_text_model(text):
        palavras = text.split()
        
        regex_palavras = '|'.join(map(re.escape, palavras))  
        regex = re.compile(regex_palavras, re.IGNORECASE)
        
        posts_collection = db.posts
        posts = posts_collection.find({"text": regex})
        
        serialized_posts = []
        for post in posts:
            post["_id"] = str(post["_id"])
            post["text"] = post["text"].replace("\n", "<br>")  # Substituir quebras de linha
            serialized_posts.append(post)
            
        return serialized_posts

    
    @staticmethod
    def get_posts_by_id_model(postId):
        posts_collection = db.posts
        post = posts_collection.find_one({"_id": ObjectId(postId)})
        comments = post.get("comments", [])
        return comments

    @staticmethod
    def update_post_by_id_model(post_id, updated_fields):
        posts_collection = db.posts
        result = posts_collection.update_one({"_id": ObjectId(post_id)}, {"$set": updated_fields})
        if result.matched_count > 0:
            return {"message": "Post updated successfully!"}, 200
        else:
            return {"message": "Post not found."}, 404
        
    @staticmethod
    def delete_post_by_id_model(post_id):
            posts_collection = db.posts
            result = posts_collection.find_one_and_delete({"_id": ObjectId(post_id)})
            if result:
                return {"message": "Comentário removido com sucesso!"}, 200
            else:
                return {"message": "Post não encontrado."}, 404

    @staticmethod
    def delete_all_post_by_userId_model(userId):
        posts_collection = db.posts
        result = posts_collection.delete_many({"userId": userId})
        return result.deleted_count > 0

    @staticmethod
    def delete_comment_from_post_model(postId, commentId):           
        posts_collection = db.posts
        result = posts_collection.update_one(
            {"_id": ObjectId(postId)},
            {"$pull": {"comments": commentId}}
        )
        return result.modified_count > 0
