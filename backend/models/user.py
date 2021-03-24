from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.dialects.postgresql import UUID
import datetime
import flask_login
import json
from .db import db, ma
from models.default_method_result import DefaultMethodResult
from datetime import datetime, timedelta
from sqlalchemy import and_, or_, update


class User(db.Model):
    # Name of the table in our database
    __tablename__ = 'Users' 
    # Defining the columns
    id = db.Column(UUID(as_uuid=True), primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)    

    def get_id(self):
        return text_type(self.id)

    @classmethod
    def add_user(cls, id, name):
        newuser = User(id = id, name = name)
        if not cls.existsuser(id):                 
            db.session.add(newuser)
            db.session.commit()        
        return newuser
    
    @classmethod
    def existsuser(cls,id):        
        count = User.query.filter_by(id=id).count()
        if count > 0:
            return True
        return False