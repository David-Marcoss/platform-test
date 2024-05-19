from flask import Blueprint, current_app, jsonify, request
from flask_cors import cross_origin
from flask_jwt_extended import  create_access_token, jwt_required, get_jwt_identity, unset_access_cookies

from.model import User
from .serializer import PasswordResetSchema, UserSchema
from marshmallow import ValidationError

from datetime import datetime, timedelta, timezone

bp_routes = Blueprint("routes", __name__)

 
@bp_routes.route("/",methods = ["GET"])
@jwt_required()
def finAll():
    pass