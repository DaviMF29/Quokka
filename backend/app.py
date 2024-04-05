from flask import Flask
from flask_jwt_extended import JWTManager
from routes.user_routes import users_app
import os
from pymongo import MongoClient
from waitress import serve
from flask_cors import CORS

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
jwt = JWTManager(app)


cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(users_app)

if __name__ == "__main__":
    print("Servidor rodando")
    serve(app, host='0.0.0.0', port=5000)