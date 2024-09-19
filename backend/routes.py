from flask import request, jsonify
from models import Volunteer, Need
from services import (
    get_all_volunteers, add_volunteer, update_volunteer, delete_volunteer,
    get_volunteer, calculate_distance, get_coordinates, get_volunteer_fields,
    get_all_needs, add_need, update_need, delete_need, get_need
)


def init_routes(app):
    """Initialize all routes for the Flask app."""

    # Routes for volunteers
    @app.route('/api/volunteers', methods=['GET'])
    def get_volunteers():
        """Get all volunteers or apply filtering."""
        name_filter = request.args.get('name', None)
        address_filter = request.args.get('address', None)
        fields_filter = request.args.getlist('fields')  # Expecting multiple fields

        volunteers = get_all_volunteers(name=name_filter, address=address_filter, fields=fields_filter)
        return jsonify(volunteers), 200

    @app.route('/api/volunteers/fields', methods=['GET'])
    def get_fields():
        """Return the distinct list of volunteer fields for the dropdown."""
        fields = get_volunteer_fields()
        return jsonify(fields), 200

    @app.route('/api/volunteers', methods=['POST'])
    def add_new_volunteer():
        """Add a new volunteer."""
        data = request.json
        volunteer = add_volunteer(data)
        return jsonify(volunteer), 201

    @app.route('/api/volunteers/<int:id>', methods=['PUT'])
    def update_existing_volunteer(id):
        """Update a volunteer."""
        data = request.json
        updated_volunteer = update_volunteer(id, data)
        return jsonify(updated_volunteer), 200

    @app.route('/api/volunteers/<int:id>', methods=['DELETE'])
    def remove_volunteer(id):
        """Delete a volunteer."""
        delete_volunteer(id)
        return '', 204

    # Routes for needs
    @app.route('/api/needs', methods=['GET'])
    def get_needs():
        """Get all needs."""
        needs = get_all_needs()
        return jsonify(needs), 200

    @app.route('/api/needs', methods=['POST'])
    def add_new_need():
        """Add a new need."""
        data = request.json
        need = add_need(data)
        return jsonify(need), 201

    @app.route('/api/needs/<int:id>', methods=['PUT'])
    def update_existing_need(id):
        """Update a need."""
        data = request.json
        updated_need = update_need(id, data)
        return jsonify(updated_need), 200

    @app.route('/api/needs/<int:id>', methods=['DELETE'])
    def remove_need(id):
        """Delete a need."""
        delete_need(id)
        return '', 204

    # Route for calculating distance between coordinates
    @app.route('/api/distance', methods=['GET'])
    def get_distance():
        """Calculate distance between two coordinates."""
        lat1 = float(request.args.get('lat1'))
        lon1 = float(request.args.get('lon1'))
        lat2 = float(request.args.get('lat2'))
        lon2 = float(request.args.get('lon2'))

        distance = calculate_distance(lat1, lon1, lat2, lon2)
        return jsonify({'distance': distance}), 200

    # Route for fetching coordinates for a given address
    @app.route('/api/coordinates', methods=['GET'])
    def get_address_coordinates():
        """Get the latitude and longitude of a given address."""
        address = request.args.get('address')
        lat, lng = get_coordinates(address)
        if lat and lng:
            return jsonify({'latitude': lat, 'longitude': lng}), 200
        else:
            return jsonify({'error': 'Address not found'}), 404
