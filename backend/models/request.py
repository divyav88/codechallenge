# entities\request.py
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from sqlalchemy.dialects.postgresql import UUID
import datetime
import flask_login
import json
from .db import db, ma
from models.default_method_result import DefaultMethodResult
from datetime import datetime, timedelta
from sqlalchemy import and_, or_, update, ForeignKey
from sqlalchemy.orm import relationship, backref
from .user import User

class Request(db.Model):
    # Name of the table in our database
    __tablename__ = 'Requests' 
    # Defining the columns
    requestid = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=False)
    status = db.Column(db.String(25), unique=False, nullable=True)  
    createdby = db.Column(db.String(25), unique=False, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.now().isoformat())
    updated_at = db.Column(db.TIMESTAMP, default=datetime.now().isoformat())
    updated = db.Column(db.Boolean, default=False) 
    userid = db.Column(UUID(as_uuid=True), ForeignKey('Users.id'))
    transactionid = db.Column(UUID(as_uuid=True), unique=False, nullable=False)
    user = relationship("User", backref=backref("Users", uselist=False))

    def get_id(self):
        return text_type(self.requestid)

    @classmethod
    def add_request(cls, name, description, status, createdby, userid, transactionid) -> DefaultMethodResult:
        createdat = datetime.now().isoformat()
        updatedat = createdat  
        _user = User()
        _user = _user.add_user(userid,'username')
        newrequest = Request(name = name, description = description, status = status.lower(), createdby = createdby, created_at = createdat, updated_at = updatedat, updated = False, userid = userid, transactionid = transactionid)        
        db.session.add(newrequest)
        db.session.commit()
        return DefaultMethodResult(True,'Request added')

    @classmethod
    def delete_request(cls, requestid) -> DefaultMethodResult:
        request = db.session.query(Request).filter_by(requestid=requestid).first()
        db.session.delete(request)
        db.session.commit()
        return DefaultMethodResult(True,'Request deleted')

    @classmethod
    def edit_request(cls, requestid, name, description, status, createdby, updated) -> DefaultMethodResult:
        isupdated = updated        
        updatedat = datetime.now().isoformat()
        db.session.query(Request).filter_by(requestid=requestid).update({Request.name:name, Request.description:description, Request.status:status, Request.createdby:createdby, Request.updated_at:updatedat, Request.updated:isupdated}, synchronize_session = False)
        db.session.commit()
        return DefaultMethodResult(True,'Request updated')

    @classmethod
    def get_requests_by_role(cls):    
       request_schema = RequestSchema(many=True)
       requests = db.session.query(Request).filter_by(status='submitted').order_by(Request.requestid).all()
       return request_schema.dump(requests)

    @classmethod
    def get_requests_by_user(cls, userid):
       request_schema = RequestSchema(many=True)
       requests = db.session.query(Request).filter_by(userid=userid).order_by(Request.requestid).all()
       return request_schema.dump(requests)

    @classmethod
    def get_requests(cls):
       request_schema = RequestSchema(many=True)
       requests = db.session.query(Request).order_by(Request.requestid).all()
       return request_schema.dump(requests)


class RequestSchema(ma.Schema):
    class Meta:
        fields = ('requestid', 'name', 'description', 'status', 'createdby', 'created_at', 'updated_at', 'updated','userid','transactionid')