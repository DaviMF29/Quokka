from flask import Flask
from flaskjwtextended import JWTManager
from routes.userroutes import usersapp
import os
from pymongo import MongoClient
from flaskcors import CORS

app = Flask(_name)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)


cors = CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

client = MongoClient(os.getenv("MONGODB_URI"))
db = client.get_database(os.getenv("MONGODB_DBNAME"))

app.register_blueprint(users_app)

if __name == "__main":
    app.run()