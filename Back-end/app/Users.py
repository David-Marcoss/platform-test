from flask import Blueprint, current_app, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import  create_access_token, jwt_required, get_jwt_identity, unset_access_cookies

from.model import User
from .serializer import PasswordResetSchema, UserSchema
from marshmallow import ValidationError

from datetime import datetime, timedelta, timezone

bp_users = Blueprint("users", __name__)

 
@bp_users.route("/",methods = ["GET"])
@jwt_required()
def finAll():
    
    schema = UserSchema(many=True)

    return schema.jsonify(User.query.all()) , 200
 
@bp_users.route("/<int:id>",methods = ["GET"])
@jwt_required()
def finOne(id):
    schema = UserSchema()

    user_data = User.query.filter_by(id=int(id)).first()

    if user_data:
        return schema.jsonify(user_data) , 200
    else:
        return jsonify({"message": "User not found"}), 404

    

@bp_users.route("/",methods = ["POST"])
def create():
    req_data = request.get_json()

    schema = UserSchema()

    try:
        user_data = schema.load(req_data)

        current_app.db.session.add(user_data)
        current_app.db.session.commit()
        
        return schema.jsonify(user_data), 201
        

    except ValidationError as err:

        return jsonify(err.messages), 422
    
    

@bp_users.route("/<int:id>",methods = ["DELETE"])
@jwt_required()
def delete(id):
   
    user_data = User.query.filter_by(id=id).first()

    if user_data:

        if( get_jwt_identity() != user_data.id):
            return jsonify({"message": "You do not have authorization to delete this user"}), 403

        current_app.db.session.delete(user_data)
        current_app.db.session.commit()
        
        return jsonify({"message": "User deleted"}), 200
    
    else:
        return jsonify({"message": "User not found"}), 404

@bp_users.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update(id):
    try:
        req_data = request.get_json()

        user_data = User.query.filter_by(id=id).first()

        if user_data:
            
            if( get_jwt_identity() != user_data.id):
                return jsonify({"message": "You do not have authorization to update this user"}), 403
            
            req_data['id'] = user_data.id 

            schema = UserSchema()
            user_data = schema.load(req_data, instance=user_data, partial=True)
            
            current_app.db.session.commit()
            
            return schema.jsonify(user_data), 200
        else:
            return jsonify({"message": "User not found"}), 404
    
    except ValidationError as err:
        return jsonify(err.messages), 422
    

@bp_users.route("/login",methods = ["POST"])
def login():

    req_data = request.get_json()

    try:
        if 'email' not in req_data or 'password' not in req_data:
            raise ValidationError('Email and password are required to login')
        
        user_data = User.query.filter_by(email = req_data['email']).first()

        if user_data and user_data.verify_password(req_data['password']):

            access_token = create_access_token(identity=user_data.id, expires_delta=timedelta(hours=8))

            return jsonify({"access_token": "Bearer " + access_token, "userId": user_data.id}), 200

        else:
            raise ValidationError('Invalid credentials')

    except ValidationError as err:
        return jsonify(err.messages), 422


@bp_users.route('/reset_password/<int:id>', methods=['POST'])
@jwt_required()
def reset_password(id):
    data = request.get_json()
    schema = PasswordResetSchema()
    errors = schema.validate(data)
    
    if errors:
        return jsonify(errors), 400
    
    user_data = User.query.filter_by(id=id).first()

    if user_data:
        old_password = data['old_password']
        new_password = data['new_password']
        
        if( get_jwt_identity() != user_data.id):
                return jsonify({"message": "You do not have authorization to update this user"}), 403
        
        if not user_data.verify_password(old_password):
            return jsonify({"error": "Old password is incorrect"}), 400
        

        user_data.password = user_data.generate_hash(new_password)
        
        current_app.db.session.commit()
            

        return jsonify({"message": "Password updated successfully"}), 200
    else:
        return jsonify({"error": "User not found"}), 404

