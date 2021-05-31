<<<<<<< HEAD
#Imports
import firebase_admin
import pyrebase
import json
from firebase_admin import credentials, auth
from flask import Flask, request
from flask_cors import CORS

#App configuration
app = Flask(__name__)
CORS(app)

#Connect to firebase
cred = credentials.Certificate('key.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('config.json')))

#Api route to sign up a new user
@app.route('/api/signup')
def signup():
    email = request.json['email']
    password = request.json['password']
    if email is None or password is None:
        return {'message': 'Error missing email or password'},400
    try:
        user = auth.create_user(
               email=email,
               password=password
        )
        return {'message': f'Successfully created user {user.uid}'},200
    except:
        return {'message': 'Error creating user'},400

#Api route to get a new token for a valid user
@app.route('/api/login')
def token():
    email = request.json['email']
    password = request.json['password']
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        jwt = user['idToken']
        return {'token': jwt}, 200
    except:
        return {'message': 'There was an error logging in'},400

if __name__ == '__main__':
    app.run(debug=True)