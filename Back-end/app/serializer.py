import re
from flask_marshmallow import Marshmallow
from marshmallow import fields, validate, ValidationError, validates
from marshmallow_sqlalchemy import SQLAlchemySchema, auto_field
from .model import User

ma = Marshmallow()

def configure(app):
    ma.init_app(app)


class UserSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = User
        load_instance = True

    password = fields.Str(required=True, validate=validate.Length(min=8, max=60), load_only=True)
    email = auto_field()

    @validates("email")
    def validates_email(self, value):
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', value):
            raise ValidationError('Invalid E-mail !!')
        
        if User.query.filter_by(email=value).first():
            raise ValidationError('E-mail already registered !!')
