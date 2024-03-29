from flask import Flask
from flask_jwt_extended import JWTManager
from routes.user_routes import users_app
import os
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)


cors = CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient(os.getenv("MONGODB_URI"))
db = client.get_database(os.getenv("MONGODB_DBNAME"))

app.register_blueprint(users_app)

if __name__ == "__main":
    app.run()