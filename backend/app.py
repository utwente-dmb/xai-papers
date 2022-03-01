from flask import Flask
from flask_mongoengine import MongoEngine
import os

# Setup mongo
app = Flask(__name__)
print(os.environ)
app.config['MONGODB_DB'] = 'db'
app.config['MONGODB_HOST'] = 'mongo'
app.config['MONGODB_PORT'] = 27017
app.config['MONGODB_USERNAME'] = os.environ["MONGO_INITDB_ROOT_USERNAME"]
app.config['MONGODB_PASSWORD'] = os.environ["MONGO_INITDB_ROOT_PASSWORD"]
db = MongoEngine()
db.init_app(app)

class User(db.Document):
    name = db.StringField()
    email = db.StringField()

@app.route("/")
def hello():
  User(name='laura', email='laura@gmail.com').save()
  return "Python good js bad"

if __name__ == "__main__":
  app.run()
