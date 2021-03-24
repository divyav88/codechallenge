import os
from flask import Flask
from flask_cors import CORS, cross_origin
from utils.db import db
from utils.exception_handler import ExceptionHandler
from utils.logger import setup_logging
from utils.baseconfig import CONFIG, BaseConfig

from dotenv import find_dotenv, load_dotenv
from utils.auth import jwt

app = Flask(__name__)

app.config.update({
        'SECRET_KEY': 'FOICLIENTAPP',
        'SQLALCHEMY_TRACK_MODIFICATIONS': False,
        'SQLALCHEMY_DATABASE_URI':BaseConfig.SQLALCHEMY_DATABASE_URI,      
})

setup_logging(os.path.join(BaseConfig.PROJECT_ROOT, 'logging.conf'))  # important to do this first


def init_app(run_mode=os.getenv('FLASK_ENV', 'production')):
    
    app.config.from_object(CONFIG[run_mode])
    CORS(app) 
    
    from .requestapi import REQUESTAPI_BLUEPRINT

    app.register_blueprint(REQUESTAPI_BLUEPRINT)

    ExceptionHandler(app)
    setup_jwt_manager(app, jwt)
    
    db.init_app(app) 

    @app.route('/', methods=['GET'])
    def index():  # pylint: disable=unused-variable
        return 'FOI Code Challenge - AOT TECH - BackEnd API working'  # pragma: no cover

    return app


def setup_jwt_manager(app, jwt_manager):
    """Use flask app to configure the JWTManager to work for a particular Realm."""
    def get_roles(a_dict):
        return a_dict['realm_access']['roles']  # pragma: no cover

    app.config['JWT_ROLE_CALLBACK'] = get_roles

    jwt_manager.init_app(app)
