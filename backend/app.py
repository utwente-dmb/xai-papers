from uuid import uuid4
from flask import Flask, jsonify, request
from flask_mongoengine import MongoEngine
import os
from model import Paper
import import_csv

# Basic flask setup
app = Flask(__name__)
app.config["UPLOAD_FOLDER"] = "./uploads/"
if not os.path.exists(app.config["UPLOAD_FOLDER"]):
    os.makedirs(app.config["UPLOAD_FOLDER"])


# Setup mongo
app.config['MONGODB_DB'] = 'db'
app.config['MONGODB_HOST'] = 'mongo'
app.config['MONGODB_PORT'] = 27017
app.config['MONGODB_USERNAME'] = os.environ["MONGO_INITDB_ROOT_USERNAME"]
app.config['MONGODB_PASSWORD'] = os.environ["MONGO_INITDB_ROOT_PASSWORD"]
db = MongoEngine()
db.init_app(app)

def json_response_error(message):
    return jsonify({"error": message})

def json_response_ok():
    return jsonify({"response": "ok"})

@app.route('/upload', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        # Check if a file is there
        if 'file' not in request.files:
            return json_response_error("No file found in request")

        # Check if the file is not empty
        file = request.files['file']
        if file.filename == '':
            return json_response_error("No file found in request")

        # Check if file is allowed
        if file and '.' in file.filename and file.filename.rsplit('.', 1)[1].lower() == "csv":
            # Save file
            filename = str(uuid4())+".csv"
            save_loc = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            file.save(save_loc)
            import_csv.import_csv(save_loc)
            return json_response_ok()
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form method=post enctype=multipart/form-data>
      <input type=file name=file>
      <input type=submit value=Upload>
    </form>
    '''

if __name__ == "__main__":
    app.run()
