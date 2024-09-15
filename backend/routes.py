from flask import jsonify, request

from models import Volunteer, Need, db
from services import (
    get_all_volunteers, add_volunteer, update_volunteer, delete_volunteer,
    get_all_needs, add_need, update_need, delete_need, calculate_distance,  get_coordinates
)

def init_routes(app):
    # ניהול מתנדבים
    @app.route('/api/volunteers', methods=['GET'])
    def get_volunteers():
        resp = jsonify(get_all_volunteers())
        print(resp)
        return resp

    @app.route('/api/volunteers', methods=['GET'])
    def get_filtered_volunteers():
        fields = request.args.getlist('fields')

        if fields:
            volunteers = Volunteer.query.filter(Volunteer.volunteer_field.in_(fields)).all()
        else:
            volunteers = Volunteer.query.all()

        return jsonify([{
            'id': v.id,
            'first_name': v.first_name,
            'last_name': v.last_name,
            'address': v.address,
            'volunteer_field': v.volunteer_field
        } for v in volunteers])

    @app.route('/volunteers/filter', methods=['GET'])
    def filter_volunteers():
        user_address = request.args.get('address')
        max_distance = int(request.args.get('max_distance', 5000))

        user_lat, user_lng = get_coordinates(user_address)
        if not user_lat or not user_lng:
            return jsonify({'error': 'Invalid address'}), 400

        volunteers = Volunteer.query.all()
        filtered_volunteers = []

        for volunteer in volunteers:
            vol_lat, vol_lng = get_coordinates(volunteer.address)
            if vol_lat and vol_lng:
                distance = calculate_distance(f"{user_lat},{user_lng}", f"{vol_lat},{vol_lng}")
                if distance is not None and distance <= max_distance:
                    filtered_volunteers.append(volunteer)

        return jsonify([{
            'id': v.id,
            'first_name': v.first_name,
            'last_name': v.last_name,
            'address': v.address,
            'volunteer_field': v.volunteer_field
        } for v in filtered_volunteers])


    @app.route('/api/volunteers', methods=['POST'])
    def create_volunteer():
        data = request.get_json()
        add_volunteer(data)
        return jsonify({'message': 'Volunteer added successfully!'}), 201

    @app.route('/api/volunteers/<int:id>', methods=['PUT'])
    def edit_volunteer(id):
        data = request.get_json()
        update_volunteer(id, data)
        return jsonify({'message': 'Volunteer updated successfully!'})

    @app.route('/api/volunteers/<int:id>', methods=['DELETE'])
    def remove_volunteer(id):
        delete_volunteer(id)
        return jsonify({'message': 'Volunteer deleted successfully!'})

    # ניהול צרכים של נזקקים
    @app.route('/api/needs', methods=['GET'])
    def get_needs():
        return jsonify(get_all_needs())

    @app.route('/api/needs', methods=['POST'])
    def create_need():
        data = request.get_json()
        add_need(data)
        return jsonify({'message': 'Need added successfully!'}), 201

    @app.route('/api/needs/<int:id>', methods=['PUT'])
    def edit_need(id):
        data = request.get_json()
        update_need(id, data)
        return jsonify({'message': 'Need updated successfully!'})

    @app.route('/api/needs/<int:id>', methods=['DELETE'])
    def remove_need(id):
        delete_need(id)
        return jsonify({'message': 'Need deleted successfully!'})
