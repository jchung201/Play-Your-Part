# coding=utf-8

import os
from flask_cors import CORS
from flask import Flask, jsonify, request, render_template

from entities.entity import Session, engine, Base
from entities.opp import Opp, OppSchema
from auth import AuthError, requires_auth, requires_role

# creating the Flask application
app = Flask(__name__)
CORS(app)

# if needed, generate database schema
Base.metadata.create_all(engine)


@app.route("/")
def home():
    return render_template("index.html")


@app.route('/opps')
def get_opps():
    # fetching from the database
    session = Session()
    opp_objects = session.query(Opp).all()

    # transforming into JSON-serializable objects
    schema = OppSchema(many=True)
    opps = schema.dump(opp_objects)

    # serializing as JSON
    session.close()
    return jsonify(opps.data)


@app.route('/opps', methods=['POST'])
@requires_auth
def add_opp():
    # mount opp object
    posted_opp = OppSchema(only=('searchType', 'category', 'title', 'description', 'location', 'contact', 'author')) \
        .load(request.get_json())

    opp = Opp(**posted_opp.data, created_by="HTTP post request")

    # persist opp
    session = Session()
    session.add(opp)
    session.commit()

    # return created opp
    new_opp = OppSchema().dump(opp).data
    session.close()
    return jsonify(new_opp), 201


@app.route('/opps/<oppId>', methods=['DELETE'])
@requires_role('admin')
def delete_opp(oppId):
    session = Session()
    opp = session.query(Opp).filter_by(id=oppId).first()
    session.delete(opp)
    session.commit()
    session.close()
    return '', 201


@app.errorhandler(AuthError)
def handle_auth_error(ex):
    response = jsonify(ex.error)
    response.status_code = ex.status_code
    return response


if __name__ == '__main__':
    import argparse

    parser = argparse.ArgumentParser(description='Development Server Help')
    parser.add_argument("-d", "--debug", action="store_true", dest="debug_mode",
                        help="run in debug mode (for use with PyCharm)", default=False)
    parser.add_argument("-p", "--port", dest="port",
                        help="port of server (default:%(default)s)", type=int, default=5000)

    cmd_args = parser.parse_args()
    app_options = {"port": os.environ.get('PORT', cmd_args.port)}
    if cmd_args.debug_mode:
        app_options["debug"] = True
        app_options["use_debugger"] = False
        app_options["use_reloader"] = False

    app.run(**app_options)
