from flask import Flask
from flask_jwt_extended import JWTManager
from routes.user_routes import users_app
import os
from waitress import serve
from pymongo import MongoClient
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)

cors = CORS(app, resources={r"/*": {"origins": "*"}})

client = MongoClient(os.getenv("MONGODB_URI"))
db = client.get_database(os.getenv("MONGODB_DBNAME"))

app.register_blueprint(users_app)

if __name__ == "__main__":
    print("Servidor rodando em http://localhost:5000/")
    serve(app, host='0.0.0.0', port=5000)