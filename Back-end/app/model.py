from flask_sqlalchemy import SQLAlchemy
import bcrypt

db =  SQLAlchemy()

def configure(app):
    db.init_app(app)
    app.db = db

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80),nullable=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(500), nullable=False)

    def __init__(self,email, password, name=""):
        self.name = name
        self.email = email
        self.password = self.generate_hash(password)  # A senha é criptografada apenas uma vez ao criar o usuário

    def generate_hash(self, password):
        return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

    def verify_password(self, password):
        
        return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))
    
    def __repr__(self):
            return '<User %r>' % self.username

    