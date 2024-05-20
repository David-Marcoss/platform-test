from flask_sqlalchemy import SQLAlchemy
import bcrypt

db = SQLAlchemy()

def configure(app):
    db.init_app(app)
    app.db = db

class User(db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)
    routes = db.relationship('Route', back_populates='user', cascade='all, delete-orphan')

    def __init__(self, email, password, name=""):
        self.name = name
        self.email = email
        self.password = self.generate_hash(password)  # A senha é criptografada apenas uma vez ao criar o usuário

    def generate_hash(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def verify_password(self, password):
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    def __repr__(self):
        return f'<User {self.name}>'

class Route(db.Model):
    __tablename__ = 'routes'
    name = db.Column(db.String(80), nullable=True)
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    user = db.relationship('User', back_populates='routes')
    points = db.relationship('RoutePoint', back_populates='route', cascade='all, delete-orphan')

class RoutePoint(db.Model):
    __tablename__ = 'route_points'
    id = db.Column(db.Integer, primary_key=True)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    point_number = db.Column(db.Integer, nullable=False)
    route_id = db.Column(db.Integer, db.ForeignKey('routes.id'), nullable=False)
    route = db.relationship('Route', back_populates='points')
