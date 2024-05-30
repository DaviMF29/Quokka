from flask import Flask
from flask_jwt_extended import JWTManager
import os
from waitress import serve
from flask_cors import CORS

from routes.auth_routes import auth_app
from routes.post_routes import post_app
from routes.user_routes import users_app
from routes.notification_routes import notification_app
from routes.comment_routes import comment_app

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = 'uploads/'
app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config['MAX_CONTENT_LENGTH'] = 16 * 1024 * 1024  # Define o tamanho máximo do arquivo (16MB neste caso)
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = 86400  # 1 dia
app.config['ALLOWED_EXTENSIONS'] = {'jpg', 'jpeg', 'png'}  # Adicione 'png' à lista de tipos de arquivo permitidos
jwt = JWTManager(app)


cors = CORS(app, resources={r"/*": {"origins": "*"}})

app.register_blueprint(auth_app)
app.register_blueprint(post_app)
app.register_blueprint(users_app)
app.register_blueprint(notification_app)
app.register_blueprint(comment_app)

if __name__ == "__main__":
    print("Servidor rodando")
    serve(app, host='0.0.0.0', port=5000)