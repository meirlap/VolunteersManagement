from models import Volunteer, Need, db
import requests

# פונקציות לניהול מתנדבים
def get_all_volunteers():
    volunteers = Volunteer.query.order_by(Volunteer.first_name, Volunteer.last_name).all()
    return [{'id': v.id, 'first_name': v.first_name, 'last_name': v.last_name, 'address': v.address, 'volunteer_field': v.volunteer_field} for v in volunteers]



# services.py (or a utility file if needed)
import requests

def get_coordinates(address):
    try:
        api_key = 'AIzaSyBf5aQhKpN32oamljuCiFl3tl8fbcHjA8U'  #
        url = f"https://maps.googleapis.com/maps/api/geocode/json?address={address}&key={api_key}"
        response = requests.get(url)
        data = response.json()

        if data['status'] == 'OK':
            location = data['results'][0]['geometry']['location']
            return location['lat'], location['lng']
        else:
            print(f"Error fetching coordinates for address {address}: {data['status']}")
            return None, None
    except Exception as e:
        print(f"Error during geocoding: {e}")
        return None, None

def calculate_distance(origin, destination):
    api_key = "AIzaSyBf5aQhKpN32oamljuCiFl3tl8fbcHjA8U"
    url = f"https://maps.googleapis.com/maps/api/distancematrix/json?origins={origin}&destinations={destination}&key={api_key}"
    response = requests.get(url)
    if response.status_code == 200:
        data = response.json()
        if data['rows'][0]['elements'][0]['status'] == 'OK':
            distance = data['rows'][0]['elements'][0]['distance']['value']  # המרחק במטרים
            return distance
    return None

def add_volunteer(data):
    # Convert volunteer_field list to a comma-separated string
    volunteer_field_str = ', '.join(data['volunteer_field']) if isinstance(data['volunteer_field'], list) else data[
        'volunteer_field']

    # Create new volunteer object with the processed volunteer_field
    new_volunteer = Volunteer(
        first_name=data['first_name'],
        last_name=data['last_name'],
        address=data['address'],
        volunteer_field=volunteer_field_str
    )

    # Add and commit the new volunteer to the database
    db.session.add(new_volunteer)
    db.session.commit()


def update_volunteer(id, data):
    # Find the existing volunteer by ID
    volunteer = Volunteer.query.get(id)

    if volunteer:
        # Convert volunteer_field list to a comma-separated string
        volunteer_field_str = ', '.join(data['volunteer_field']) if isinstance(data['volunteer_field'], list) else data[
            'volunteer_field']

        # Update the volunteer details
        volunteer.first_name = data['first_name']
        volunteer.last_name = data['last_name']
        volunteer.address = data['address']
        volunteer.volunteer_field = volunteer_field_str

        # Commit the changes to the database
        db.session.commit()
    else:
        raise ValueError(f"Volunteer with id {id} not found")


def delete_volunteer(id):
    volunteer = Volunteer.query.get(id)
    if volunteer:
        db.session.delete(volunteer)
        db.session.commit()

# פונקציות לניהול צרכים של נזקקים
# בקובץ services.py
def get_all_needs():
    needs = Need.query.all()
    # עדכון השדות בהתאם לשמות הקיימים בטבלה
    return [{
        'id': n.id,
        'full_name': n.full_name,
        'address': n.address,
        'apartment_count': n.apartment_count,
        'phone': n.phone,
        'whatsapp_group': n.whatsapp_group,
        'special_residents': n.special_residents,
        'additional_needs': n.additional_needs,
        'event_attendance': n.event_attendance
    } for n in needs]


def add_need(data):
    new_need = Need(
        description=data['description'],
        address=data['address'],
        need_type=data['need_type']
    )
    db.session.add(new_need)
    db.session.commit()

def update_need(id, data):
    need = Need.query.get(id)
    if need:
        need.description = data.get('description', need.description)
        need.address = data.get('address', need.address)
        need.need_type = data.get('need_type', need.need_type)
        db.session.commit()

def delete_need(id):
    need = Need.query.get(id)
    if need:
        db.session.delete(need)
        db.session.commit()
