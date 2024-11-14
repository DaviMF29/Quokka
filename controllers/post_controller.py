import os
import uuid
from flask import abort
from models.Post import Post
from utils.user_posts import (
    add_post_in_user,delete_post_from_user,
    delete_post_if_was_favorited,delete_post_if_was_liked,
    delete_comments_from_post,add_tag_to_post)
from middleware.global_middleware import (
    verify_post, verify_change_in_text,verify_post_is_from_user,
    verify_user,validate_text_length)

#from db.firebase import *

def create_post_controller(userId, username, text, createdAt, images=[]):
    upload_folder = 'uploads'
    if not os.path.exists(upload_folder):
        os.makedirs(upload_folder)

    verify_user(userId)
    images_urls = []

    #for image in images:
    #    unique_filename = str(uuid.uuid4()) + "_" + image.filename
    #    image_path = os.path.join(upload_folder, unique_filename)
    #    image.save(image_path)

    #    destination_blob_name = "images/" + unique_filename  
    #    image_url = upload_image_to_firebase(image_path, destination_blob_name) 
    #    images_urls.append(image_url)

    #    os.remove(image_path)
    validate_text_length(text)
    post_id = Post.create_post_model(userId, username, text, createdAt, images_urls)
    add_post_in_user(userId, post_id)

    return post_id



def get_all_posts_controller():
    posts = Post.get_all_posts()
    texts_with_tags = []
    for post in posts:
        text = post.get("text")
        text_with_tag = add_tag_to_post(text)
        texts_with_tags.append(text_with_tag)
    return texts_with_tags

def get_all_posts_limited_controller(page, limit):
    if page <= 0:
        abort(400, "Invalid page number")
    all_posts = Post.get_all_posts()[::-1]
    initialPos = (page - 1) * limit
    finalPos = page * limit
    if initialPos >= len(all_posts):
        return []
    posts = all_posts[initialPos:finalPos]
    return posts


def delete_post_controller(postId, userId):
    verify_post_is_from_user(postId, userId)  
    message = "Post deleted successfully"
    delete_post_from_user(userId, postId)
    delete_post_if_was_favorited(postId)
    delete_post_if_was_liked(postId)
    delete_comments_from_post(postId)
    Post.delete_post_by_id_model(postId)
    return {"message": message}


def get_post_by_id_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return Post.get_post_by_id_model(postId)

def update_post_by_id_controller(postId, text):       
    verify_change_in_text(postId,text)
    updated_fields = {"text": text}
    Post.update_post_by_id_model(postId, updated_fields)
    return {"message": "Post updated successfully"}

def get_likes_from_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return {"likes": post["likes"]}

def get_comments_from_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    comments = Post.get_posts_by_id_model(postId)
    return {"comments": comments}, 200

def get_text_from_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return Post.get_text_from_post_model(postId)

def get_userId_from_post_controller(postId):
    post = verify_post(postId)
    if not post:
        return {"message": "Post not found"}, 404
    return Post.get_userId_from_post_model(postId)