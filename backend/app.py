from flask import Flask, jsonify, request
import flask_cors
import db
import json

app = Flask(__name__)
db.init_db()
flask_cors.CORS(app, resources={r"/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type'


@app.route('/routes', methods=['GET'])
def get_routes():
    return jsonify(db.get_routes())


@app.route('/bookings/<email>', methods=['GET'])
def get_booking(email):
    return jsonify(db.get_booking(email))


@app.route('/bookings', methods=['POST'])
def add_booking():
    data = request.get_json()
    print(data)
    email = data['email']
    route = data['route']
    seat = data['seat']
    if db.add_booking(email, route, seat):
        return jsonify({"success": True})
    return jsonify({"success": False})


@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    print(data)
    name = data['name']
    age = data['age']
    email = data['email']
    password = data['password']
    if db.add_user(name, age, email, password):
        return jsonify({"success": True})
    return jsonify({"success": False})


@app.route('/users/login', methods=['POST'])
def check_user():
    data = request.get_json()
    email = data['email']
    password = data['password']
    if db.check_user(email, password):
        return jsonify({"success": True})
    return jsonify({"success": False})


@app.route('/users/<email>', methods=['GET'])
def get_user(email):
    return {'name': db.get_username(email)}


@app.errorhandler(404)
def not_found(e):
    return jsonify({"success": False, "error": "Not found"}), 404

if __name__ == '__main__':
    app.run()