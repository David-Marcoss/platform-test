from flask import Blueprint, current_app, jsonify, request
from flask_jwt_extended import jwt_required, get_jwt_identity

from .model import Route, RoutePoint, User
from .serializer import RouteSchema
from marshmallow import ValidationError

bp_routes = Blueprint("routes", __name__)

@bp_routes.route("/", methods=["POST"])
#@jwt_required()
def create_route():
    data = request.get_json()

    user_id = data.get('user_id')
    points_data = data.get('points')

    if not user_id or not points_data:
        return jsonify({"error": "user_id and points are required"}), 400

    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    route = Route(user_id=user_id)
    current_app.db.session.add(route)
    current_app.db.session.flush() 

    points = []
    for point in points_data:
        latitude = point.get('latitude')
        longitude = point.get('longitude')
        point_number = point.get('point_number')

        if latitude is None or longitude is None or point_number is None:
            return jsonify({"error": "latitude, longitude, and point_number are required for each point"}), 400

        route_point = RoutePoint(
            latitude=latitude,
            longitude=longitude,
            point_number=point_number,
            route_id=route.id
        )
        points.append(route_point)

    current_app.db.session.add_all(points)
    current_app.db.session.commit()

    route_schema = RouteSchema()
    return route_schema.jsonify(route), 201


@bp_routes.route("/", methods=["GET"])
def get_all_routes():
    routes = Route.query.all()
    route_schema = RouteSchema(many=True)
    result = route_schema.dump(routes)
    return jsonify(result), 200

@bp_routes.route("/<int:route_id>", methods=["GET"])
def get_route_by_id(route_id):
    route = Route.query.get(route_id)
    if not route:
        return jsonify({"error": "Route not found"}), 404
    route_schema = RouteSchema()
    result = route_schema.dump(route)
    return jsonify(result), 200

@bp_routes.route("/user/<int:user_id>", methods=["GET"])
def get_routes_by_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    routes = user.routes
    route_schema = RouteSchema(many=True)
    result = route_schema.dump(routes)
    return jsonify(result), 200
