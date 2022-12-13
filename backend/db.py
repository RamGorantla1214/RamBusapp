import pymongo
import env

mongo = pymongo.MongoClient(env.mongo_url)
db = mongo["busapp"]


def init_db():
    db["users"].delete_many({})
    db["routes"].delete_many({})
    db["bookings"].delete_many({})

    db["users"].insert_many([
        {"name": "John", "age": 25, "email": "john@busapp.com", "password": "1234"},
        {"name": "Jane", "age": 30, "email": "jane@busapp.com", "password": "1234"},
        {"name": "Jack", "age": 35, "email": "jack@busapp.com", "password": "1234"}
    ])

    db["routes"].insert_many([
        {"name": "Dublin-Galway", "start": "Dublin", "end": "Galway", "price": 20},
        {"name": "Galway-Dublin", "start": "Galway", "end": "Dublin", "price": 20},
        {"name": "Dublin-Cork", "start": "Dublin", "end": "Cork", "price": 25},
        {"name": "Cork-Dublin", "start": "Cork", "end": "Dublin", "price": 25},
        {"name": "Galway-Cork", "start": "Galway", "end": "Cork", "price": 30},
        {"name": "Cork-Galway", "start": "Cork", "end": "Galway", "price": 30},
    ])

    print("Database initialized")

def remove_mongo_object_id(data):
    data = list(data)
    for item in data:
        item.pop("_id")
    return data

def get_routes():
    return remove_mongo_object_id(db["routes"].find())


def check_if_route_exists(route):
    result = db["routes"].find_one({"name": route})
    if result:
        return True
    return False


def get_booking(email):
    return remove_mongo_object_id(db["bookings"].find({"email": email}))


def check_if_seat_available(route, seat):
    result = db["bookings"].find_one({"route": route, "seat": seat})
    if result:
        return False
    return True


def add_booking(email, route, seat):
    if check_if_email_exists(email) and check_if_route_exists(route) and check_if_seat_available(route, seat):
        db["bookings"].insert_one({"email": email, "route": route, "seat": seat})
        return True
    return False


def delete_booking(email, route):
    db["bookings"].delete_one({"email": email, "route": route})


def check_user(email, password):
    if check_if_email_exists(email):
        user_password = db["users"].find_one({"email": email})["password"]
        if user_password == password:
            return True
    return False


def check_if_email_exists(email):
    if db["users"].find_one({"email": email}):
        return True
    return False


def add_user(name, age, email, password):
    if check_if_email_exists(email):
        return False
    if name and password and email and age:
        db["users"].insert_one({"name": name, "age": age, "email": email, "password": password})
        return True
    return False

def get_username(email):
    return db["users"].find_one({"email":email})['name']
