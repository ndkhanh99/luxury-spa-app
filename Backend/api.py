from flask import Flask , request , jsonify
import json
import os
from flask_sqlalchemy import SQLAlchemy
import pymysql
from flask_cors import CORS
from flask_login import LoginManager , login_required , login_user

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = "databse" 
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SECRET_KEY'] = os.urandom(100)

################################### Create Model ###################################
db = SQLAlchemy(app)
class Booking(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    name = db.Column(db.String(200) , nullable = False)
    phone = db.Column(db.String(200) , nullable = False)
    date = db.Column(db.String(200) , nullable = False)
    time = db.Column(db.String(200) , nullable = False)
    service_list = db.Column(db.String(200) , nullable = False)
    technician = db.Column(db.String(200) , nullable = False)
    def __init__(self, name, phone , date , time , service_list , technician):
        self.name = name
        self.phone = phone
        self.date = date
        self.time = time
        self.service_list = json.dumps(service_list)      #seriliaze list
        self.technician = technician
    def get_list(self):                                    #Delize list
        return json.loads(self.service_list)

class Customer(db.Model):
    id = db.Column(db.Integer , primary_key = True)
    name = db.Column(db.String(200) , nullable = False)
    phone = db.Column(db.String(200) , nullable = True)
    email = db.Column(db.String(200) , nullable = True)
    dob = db.Column(db.String(200) , nullable = False)
    prefer = db.Column(db.String(200) , nullable = False)
    password = db.Column(db.String(200) , nullable = False)

    def __init__(self, name , phone , email , dob , prefer , password):
        self.name = name
        self.phone = phone
        self.email = email
        self.dob = dob
        self.password = password
        self.prefer = prefer
    
with app.app_context():         # Create Table
    db.create_all()


@app.route("/api/book" , methods = ['POST'])
def booking():
    data = request.get_json()
    slist = data.get('service')
    phone = data.get('phone')
    name = data.get('name')
    time = data.get('time')
    date = data.get('date')
    technician = data.get('technician')
    booking = Booking(name , phone , date, time , slist , technician)
    db.session.add(booking)
    db.session.commit()
    return jsonify({
        "messages": "Thank You For Your Appointment! We will be in touch soon",
    })
    
@app.route("/api/checking" , methods = ['POST'])
def checking():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    CheckCustomer = Booking.query.filter_by(phone = phone).first()
    if CheckCustomer:
        return jsonify({
            'messages': 'Check in Successful'
        })
    else:
        return jsonify({
            'messages': 'Information Does Not Match Our Records'
        })

@app.route('/api/generatehours/<days>/<date>')
def generatehours(days , date):
    hourSun = ['10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM']
    hourReg = ['09:00 AM', '09:15 AM', '09:30 AM', '09:45 AM', '10:00 AM', '10:15 AM', '10:30 AM', '10:45 AM', '11:00 AM', '11:15 AM', '11:30 AM', '11:45 AM', '12:00 PM', '12:15 PM', '12:30 PM', '12:45 PM', '01:00 PM', '01:15 PM', '01:30 PM', '01:45 PM', '02:00 PM', '02:15 PM', '02:30 PM', '02:45 PM', '03:00 PM', '03:15 PM', '03:30 PM', '03:45 PM', '04:00 PM', '04:15 PM', '04:30 PM', '04:45 PM', '05:00 PM', '05:15 PM', '05:30 PM', '05:45 PM', '06:00 PM', '06:15 PM', '06:30 PM', '06:45 PM', '07:00 PM']
    similartime  = Booking.query.filter(Booking.date == date).all()
    booked_times = [booking.time for booking in similartime]
    if days == 'Sun':
        available_hours = [item for item in hourSun if item not in booked_times]
    else:
        available_hours = [item for item in hourReg if item not in booked_times]
    return jsonify({
        "hours": available_hours,
    })

@app.route('/api/Register', methods = ['POST'])
def Register():
    data = request.get_json()
    name = data.get('name')
    phone = data.get('phone')
    email = data.get('email')
    dob = data.get('dob')
    prefer = data.get('prefer')
    password = data.get('password')
    r = Register(name , phone , email, dob , prefer , password)
    db.session.add(r)
    db.session.commit()
    return jsonify({
        "messages": "Thank You For Register With Us",
    })
    


if __name__ == '__main__':
    app.run(debug = True)
