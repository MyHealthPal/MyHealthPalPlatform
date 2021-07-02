#Imports
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
import jsonify
app = Flask(__name__)
CORS(app)

app.config['CASSANDRA_HOSTS'] = ['127.0.0.1']
app.config['CASSANDRA_KEYSPACE'] = "cqlengine"
db = CQLAlchemy(app)


class VaccinationPassport(db.Model):
    id = db.columns.UUID(primary_key=True, default=uuid.uuid4)
    public_id = db.columns.Text()
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

    def get_data(self):
        return {
            'id': str(self.id),
            'public_id':self.public_id,
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
        ##Sends Verifcation email
        userLog = pb.auth().sign_in_with_email_and_password(email, password)
        pb.auth().send_email_verification(userLog['idToken'])
        return {'message': f'Successfully created user {user.uid}'},200
    except:
        return {'message': 'Error creating user'},400

#Endpoint to generate token for a valid user
@app.route('/api/login')
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
    newVaccination = VaccinationPassport(public_id = request.user['uid'], first_name = data['firstName'], last_name = data['lastName'] ,
     health_card = data['healthCard'], date_of_birth = data['DateOfBirth'], date_of_dose  = data['DateOfDose'], agent = data['agent'],
    product_name = data['productName'], diluent_product = data["DiluentProduct"], lot = data['lot'], dosage = data['dosage'], route = data['route'],
    site = data['site'], dose = data['dose'], organization = data['org'])
    newVaccination.save()

    return {"message":"Vaccine was added"},200
    
@app.route('/api/getVaccineAll',methods=['GET'])
@TokenRequired
def getVaccineAll():
    #TO DO MAKE IT MORE EFFICENT
    vaccine= VaccinationPassport.objects.all()
    VaccineList ={}
    for vac in vaccine:
        data = vac.get_data()
        if data['public_id']==request.user['uid']:
            VaccineList[data['id']]= data
    return VaccineList


@app.route('/api/getVaccine', methods =['GET'])
def getVaccine():
    data =request.json
    vaccine= VaccinationPassport.objects.get(id=data['id'])
    VaccineList={}
    if vaccine:
        data = vaccine.get_data()
        VaccineList[data['id']]=data
    
        return VaccineList
    else:
        return {"message":"No Vaccine is Found"}










if __name__ == '__main__':
    app.run(debug=True)