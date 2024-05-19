import re
from flask_marshmallow import Marshmallow, Schema
from marshmallow import fields, validate, ValidationError, validates
from marshmallow_sqlalchemy import auto_field
from .model import Route, RoutePoint, User

ma = Marshmallow()

def configure(app):
    ma.init_app(app)

## serializer para os dados das rotas
class RoutePointSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = RoutePoint
        load_instance = True

class RouteSchema(ma.SQLAlchemyAutoSchema):
    points = ma.Nested(RoutePointSchema, many=True)

    class Meta:
        model = Route
        load_instance = True



## serializer para os dados de usuarios
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


class PasswordResetSchema(Schema):
    old_password = fields.Str(required=True, validate=validate.Length(min=8, max=60))
    new_password = fields.Str(required=True, validate=validate.Length(min=8, max=60))




