import os
from dotenv import load_dotenv

from flask import Flask
from flask_migrate import Migrate
from flask_cors import CORS

from .model import configure as config_db
from .serializer import configure as config_ma
from .jwt import configure_jwt as config_jwt

from .Users import bp_users
from .Routes import bp_routes

def create_app():
    app = Flask(__name__)
    
    app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv("DATABASE_URI")
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SECRET_KEY'] = os.getenv("SECRET_KEY")

    config_db(app)
    config_ma(app)
    config_jwt(app)
    
    CORS(app, support_credentials=True)

    Migrate(app, app.db)

    app.register_blueprint(bp_users,url_prefix='/users')
    app.register_blueprint(bp_routes,url_prefix='/routes')


    return app

