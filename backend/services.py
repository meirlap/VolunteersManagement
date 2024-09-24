from models import db, Volunteer, Need  # ייבוא db מהמודלים
import os
from sqlalchemy import or_
import requests
from math import radians, cos, sin, sqrt, atan2
GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')

# Function to get all volunteers with optional filters
def get_all_volunteers(name=None, address=None, fields=None):
    query = Volunteer.query

    # סינון לפי שם פרטי ושם משפחה
    if name:
        query = query.filter(or_(Volunteer.first_name.ilike(f'%{name}%'), Volunteer.last_name.ilike(f'%{name}%')))

    # סינון לפי תחומי התנדבות
    if fields and len(fields) > 0:
        query = query.filter(Volunteer.volunteer_field.op('regexp')('|'.join(fields)))

    return [{'id': v.id, 'first_name': v.first_name, 'last_name': v.last_name, 'address': v.address,
             'volunteer_field': v.volunteer_field} for v in query.all()]


# Function to add a new volunteer
def add_volunteer(data):
    new_volunteer = Volunteer(
        first_name=data['first_name'],
        last_name=data['last_name'],
        address=data['address'],
        volunteer_field=','.join(data['volunteer_field'])
    )
    lat, lng = get_coordinates(data['address'])
    new_volunteer.latitude = lat
    new_volunteer.longitude = lng

    db.session.add(new_volunteer)
    db.session.commit()
    return {'id': new_volunteer.id, 'first_name': new_volunteer.first_name, 'last_name': new_volunteer.last_name,
            'address': new_volunteer.address, 'volunteer_field': new_volunteer.volunteer_field}

# Function to update a volunteer
def update_volunteer(id, data):
    volunteer = Volunteer.query.get(id)

    if not volunteer:
        return None

    volunteer.first_name = data.get('first_name', volunteer.first_name)
    volunteer.last_name = data.get('last_name', volunteer.last_name)
    volunteer.address = data.get('address', volunteer.address)
    volunteer.volunteer_field = ','.join(data.get('volunteer_field', volunteer.volunteer_field.split(',')))

    # Update coordinates if address has changed
    if 'address' in data:
        lat, lng = get_coordinates(data['address'])
        volunteer.latitude = lat
        volunteer.longitude = lng

    db.session.commit()
    return {'id': volunteer.id, 'first_name': volunteer.first_name, 'last_name': volunteer.last_name,
            'address': volunteer.address, 'volunteer_field': volunteer.volunteer_field}

# Function to delete a volunteer
def delete_volunteer(id):
    volunteer = Volunteer.query.get(id)

    if volunteer:
        db.session.delete(volunteer)
        db.session.commit()

# Function to get volunteer by id
def get_volunteer(id):
    volunteer = Volunteer.query.get(id)
    if volunteer:
        return {'id': volunteer.id, 'first_name': volunteer.first_name, 'last_name': volunteer.last_name,
                'address': volunteer.address, 'volunteer_field': volunteer.volunteer_field}
    return None

# Function to calculate distance between two points (latitude, longitude)
from math import radians, cos, sin, sqrt, atan2

def calculate_distance(lat1, lon1, lat2, lon2):
    R = 6371000  # Radius of the Earth in meters
    dlat = radians(lat2 - lat1)
    dlon = radians(lon2 - lon1)  # תיקון כאן
    a = sin(dlat / 2) ** 2 + cos(radians(lat1)) * cos(radians(lat2)) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))
    distance = R * c
    return distance

# Function to get the coordinates (latitude, longitude) for an address using Google Maps API
def get_coordinates(address):
    api_key = "AIzaSyBffHndqs2ubMKRwuTeAMxylltboXd8Gu0"  # Use the function to get the Google API key
    base_url = f'https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}'
    response = requests.get(base_url)
    if response.status_code == 200:
        data = response.json()
        if data['results']:
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
    return None, None
# Function to get all distinct volunteer fields
def get_volunteer_fields():
    all_volunteers = Volunteer.query.with_entities(Volunteer.volunteer_field).all()
    unique_fields = set()
    for volunteer in all_volunteers:
        fields = volunteer.volunteer_field.split(',')
        unique_fields.update(fields)
    return list(unique_fields)

# Function to get all needs
def get_all_needs():
    needs = Need.query.all()
    return [{'id': n.id, 'description': n.description, 'address': n.address, 'type': n.need_type} for n in needs]

# Function to add a new need
def add_need(data):
    new_need = Need(
        description=data['description'],
        address=data['address'],
        need_type=data['need_type']
    )
    lat, lng = get_coordinates(data['address'])
    new_need.latitude = lat
    new_need.longitude = lng

    db.session.add(new_need)
    db.session.commit()
    return {'id': new_need.id, 'description': new_need.description, 'address': new_need.address,
            'need_type': new_need.need_type}

# Function to update an existing need
def update_need(id, data):
    need = Need.query.get(id)

    if not need:
        return None

    need.description = data.get('description', need.description)
    need.address = data.get('address', need.address)
    need.need_type = data.get('need_type', need.need_type)

    # Update coordinates if address has changed
    if 'address' in data:
        lat, lng = get_coordinates(data['address'])
        need.latitude = lat
        need.longitude = lng

    db.session.commit()
    return {'id': need.id, 'description': need.description, 'address': need.address, 'need_type': need.need_type}

# Function to delete a need
def delete_need(id):
    need = Need.query.get(id)

    if need:
        db.session.delete(need)
        db.session.commit()

# Function to get a need by id
def get_need(id):
    need = Need.query.get(id)
    if need:
        return {'id': need.id, 'description': need.description, 'address': need.address, 'need_type': need.need_type}
    return None
