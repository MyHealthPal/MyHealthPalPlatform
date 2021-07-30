#Imports
from cassandra.metadata import Token
import firebase_admin
import pyrebase
import json
from firebase_admin import credentials, auth
from flask import Flask, request
from flask_cors import CORS
from functools import wraps
from firebase_admin import firestore 
import uuid
from flask import Flask
from flask_cqlalchemy import CQLAlchemy
import io
from PIL import Image
import os
#from cqlengine import columns

import jsonify
app = Flask(__name__)
CORS(app)

app.config['CASSANDRA_HOSTS'] = ['127.0.0.1']
app.config['CASSANDRA_KEYSPACE'] = "cqlengine"
db = CQLAlchemy(app)

class User (db.Model):
    public_id = db.columns.Text(primary_key=True)
    first_name  = db.columns.Text()
    last_name = db.columns.Text()
    health_card = db.columns.Text()
    email = db.columns.Text()
    date_of_birth = db.columns.Text()
    list_of_vaccines = db.columns.List(value_type=db.columns.Text)
    list_of_perscriptions = db.columns.List(value_type=db.columns.Text)


    def get_data(self):
        return {
            'email': str(self.email),
            'public_id':self.public_id,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'health_card':self.health_card,
            'date_of_birth':str(self.date_of_birth),
            'list_of_vaccines':self.list_of_vaccines,
            'list_of_prescription':self.list_of_perscriptions
        }

class prescriptionPassport(db.Model):
    public_id = db.columns.Text(primary_key=True)
    name = db.columns.Text()
    dosage = db.columns.Text()
    numberofDoses = db.columns.Text() ##Can have fractional half, blah blah so text is safter
    duration = db.columns.Text() ## Every X day or once a day etc
    comments = db.columns.Text()

    def get_data(self):
        return {
            'name': str(self.name),
            'public_id':self.public_id,
            'dosage': self.dosage,
            'numberofDoses': self.numberofDoses,
            'duration':self.duration,
            'comments':self.comments
        }

class VaccinationPassport(db.Model):
    id = db.columns.UUID(primary_key=True)
    first_name  = db.columns.Text()
    last_name = db.columns.Text()
    health_card = db.columns.Text()
    date_of_birth = db.columns.Date()
    date_of_dose = db.columns.Date()
    agent = db.columns.Text()
    product_name = db.columns.Text()
    diluent_product = db.columns.Text()
    lot = db.columns.Text()
    dosage = db.columns.Text()
    route = db.columns.Text()
    site = db.columns.Text()
    dose = db.columns.Integer()
    organization = db.columns.Text()
    image = db.columns.Blob()

    def get_data(self):
        return {
            'id': str(self.id),
            'first_name': self.first_name,
            'last_name': self.last_name,
            'health_card':self.health_card,
            'date_of_birth':str(self.date_of_birth),
            'date_of_dose':str(self.date_of_dose),
            'agent':self.agent,
            'product_name':self.product_name,
            'diluent_product':self.diluent_product,
            'lot': self.lot, 
            'dosage':self.dosage,
            'route':self.route,
            'site':self.site,
            'dose':self.dose,
            'organization':self.organization
        }
    def get_imageID(self):
        return {
        'image_binary':self.image
        }

db.sync_db()


#Connect to firebase
cred = credentials.Certificate('key.json')
firebase = firebase_admin.initialize_app(cred)
pb = pyrebase.initialize_app(json.load(open('config.json')))

#Middleware to protect endpoints
def TokenRequired(f):
    @wraps(f)
    def wrap(*args,**kwargs):
        if not request.headers.get('x-access-tokens'):
            return {'message': 'No token provided'},400
        try:
            user = auth.verify_id_token(request.headers['x-access-tokens'])
            request.user = user
        except:
            return {'message':'Invalid token provided.'},400
        return f(*args, **kwargs)
    return wrap

#Get User Data
@app.route('/api/userdata')
@TokenRequired
def userdata():
    return {'data': request.user}, 200
    
#End point to create user
@app.route('/api/signup', methods=['POST'])
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
        ##Sends Verifcation email
        userLog = pb.auth().sign_in_with_email_and_password(email, password)
        pb.auth().send_email_verification(userLog['idToken'])
        return {'message': 'Successfully created user'},200
    except:
        return {'message': 'Error creating user'},400

#Endpoint to generate token for a valid user
@app.route('/api/login', methods = ['POST'])
def token():
    email = request.json['email']
    password = request.json['password']
    try:
        user = pb.auth().sign_in_with_email_and_password(email, password)
        token = user['idToken']
        val = pb.auth().get_account_info(token)
        if( val['users'][0]['emailVerified']):
            return {'token': token}, 200
        else:
            return {'message':'verify email'},400   

       
    except:
       return {'message': 'There was an error logging in'},400


# RESET PASSWORD
@app.route ('/api/resetPassword')
def getAccountInfo():
    email= request.json['email']
    info = pb.auth().send_password_reset_email(email)
    return info 

@app.route('/api/AddVaccine', methods=['POST'])
@TokenRequired
def addVaccine():
    data = request.json
    idUUID = uuid.uuid4()
    newVaccination = VaccinationPassport(id = idUUID, first_name = data['firstName'], last_name = data['lastName'] ,
     health_card = data['healthCard'], date_of_birth = data['DateOfBirth'], date_of_dose  = data['DateOfDose'], agent = data['agent'],
    product_name = data['productName'], diluent_product = data["DiluentProduct"], lot = data['lot'], dosage = data['dosage'], route = data['route'],
    site = data['site'], dose = data['dose'], organization = data['org'])

    user = User.objects.get(public_id=request.user['uid'])
    userData = user.get_data()
    vaccines = userData['list_of_vaccines']
    vaccines.append(str(idUUID))
    user.update(list_of_vaccines = vaccines)


    newVaccination.save()

    return {"message":"Vaccine was added"},200
    
@app.route('/api/getVaccineAll',methods=['GET'])
@TokenRequired
def getVaccineAll():
    user = User.objects.get(public_id=request.user['uid'])
    userData = user.get_data()
    vaccines = userData['list_of_vaccines']
    vaccineAllData = {}

    for vaxs in vaccines:
        vac= VaccinationPassport.objects.get(id=vaxs)
        vacData= vac.get_data()
        vaccineAllData[vacData['id']]=vacData
    return vaccineAllData

@app.route('/api/getVaccine/<vaccineId>', methods =['GET'])
@TokenRequired
def getVaccine(vaccineId):
    try:
        user = User.objects.get(public_id=request.user['uid'])
        userData = user.get_data()
        vaccines = userData['list_of_vaccines']
        if vaccineId in vaccines:
            vaccine= VaccinationPassport.objects.get(id=vaccineId)
            VaccineList={}
            dataV = vaccine.get_data()
            VaccineList=dataV
        
            return VaccineList
        else:
            return {"message":"Vaccine does not exist"}
    except:
        return {"message":"Vaccine does not exist"}


@app.route('/api/updateVaccine', methods =['PUT'])
@TokenRequired
def updateVaccine():
    try:
        user = User.objects.get(public_id=request.user['uid'])
        userData = user.get_data()
        vaccines = userData['list_of_vaccines']
        data=request.json
        if data['id'] in vaccines:
            vaccine= VaccinationPassport.objects.get(id=data['id'])
            vaccine.update(first_name = data['firstName'], last_name = data['lastName'] ,
        health_card = data['healthCard'], date_of_birth = data['DateOfBirth'], date_of_dose  = data['DateOfDose'], agent = data['agent'],
        product_name = data['productName'], diluent_product = data["DiluentProduct"], lot = data['lot'], dosage = data['dosage'], route = data['route'],
        site = data['site'], dose = data['dose'], organization = data['org'])

            return {"message":"Updated"}
    
        else:
            return {"message": "Vaccine does not exist"}
    except:
        return {"message": "Vaccine does not exist"}
        
@app.route('/api/deleteVaccine', methods =['DELETE'])
@TokenRequired
def deleteVaccine():
    try:
        user = User.objects.get(public_id=request.user['uid'])
        userData = user.get_data()
        vaccines = userData['list_of_vaccines']
        data=request.json
        if data['id'] in vaccines:
            vaccine= VaccinationPassport.objects.get(id=data['id'])
            vaccineData= vaccine.get_data()
            vaccineId = vaccineData['id']
            vaccines.remove(vaccineId)
            user.update(list_of_vaccines = vaccines)
            vaccine.delete()
            return {"message":"Deleted vaccine"}
    
        else:
            return {"message": "Vaccine does not exist"}
    except:
        return {"message": "Error: Vaccine could not be deleted"}
@app.route('/api/deleteUser', methods =['DELETE'])
@TokenRequired
def deleteUser():
    try:
        user = User.objects.get(public_id=request.user['uid'])
        userData = user.get_data()
        vaccines = userData['list_of_vaccines']
        for vac in vaccines:
            vaccineItem = VaccinationPassport.objects.get(id=vac)
            vaccineItem.delete()
        user.delete()

        return {"message": "User and Vaccine data have been deleted"}
    except:
        return {"message": "Error: User could not be deleted"}



@app.route('/api/addUser', methods =['POST'])
@TokenRequired
def addUser():
    data = request.json
    newUser = User(public_id = request.user['uid'], first_name = data['firstName'], last_name=data['lastName'], health_card= data['healthCard'],email=request.user['email'],
    date_of_birth=data['DateOfBirth'])
    
    newUser.save()

    return {"message":"User was created"},200

@app.route('/api/getUser', methods = ['GET'])
@TokenRequired
def getUser():
    try:
        user= User.objects.get(public_id=request.user['uid'])
        userSchema={}
        if user:
            data = user.get_data()
            userSchema[data['email']]=data
        
            return userSchema
        else:
            return {"message":"User does not exist"}, 404
    except:
        return {"message":"Error: User does not exist"}, 404

@app.route('/api/updateUser', methods =['PUT'])
@TokenRequired
def updateUser():
    try:
        data = request.json
        user= User.objects.get(public_id=request.user['uid'])

        if user:
            user.update (first_name = data['firstName'], last_name=data['lastName'], health_card= data['healthCard'],email=request.user['email'],
        date_of_birth=data['DateOfBirth'])
            return {"message":"User Updated"}
    
        else:
            return {"message": "User does not exist"}
    except:
        return {"message": "User does not exist"}
    
@app.route('/api/uploadImage/<vaccineId>', methods=['POST'])
@TokenRequired
def uploadImage(vaccineId):
   
    image_data=request.files['image'].read()
    vaccine= VaccinationPassport.objects.get(id=vaccineId)
    vaccine.update(image=image_data)

    return {"message":"Image Uploaded"}

@app.route('/api/getImage/<vaccineId>', methods=['GET'])
@TokenRequired    
def getImage(vaccineId):
    ##THIS IS A TESTING ENDPOINT TO VERIFY IF WE CAN RECREATE THE IMAGE
    vaccine= VaccinationPassport.objects.get(id=vaccineId)
    imageID= vaccine.get_imageID()
    basedir = os.path.abspath(os.path.dirname(__file__))
    print(basedir)
    with open(f'{basedir}\images\{vaccineId}.jpg', 'wb') as file:
        file.write(imageID['image_binary'])
    return {"message":"Image Created"}, 200

if __name__ == '__main__':
    app.run(debug=True)