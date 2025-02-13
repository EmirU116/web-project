from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send
import uuid

# Initialize the Flask application
app = Flask(__name__)
# Set a secret key for the Flask application
app.config['SECRET_KEY'] = 'secret!'
# Initialize SocketIO with the Flask app, allowing cross-origin requests
socketio = SocketIO(app, cors_allowed_origins="*")

chat_rooms = {}

@app.route('/create-server', methods=['GET'])
def get_chat_rooms():
    return jsonify(chat_rooms), 200

@app.route('/create-server' , methods=['POST'])
def create_server():
    data = request.get_json()
    server_name = data.get('server_name')
    owner_id = data.get('owner_id')
    message = data['message']

    # error handling if server name and owener id is not provided
    if not server_name or not owner_id:
        return jsonify({'error': 'Invalid data'})
    
    server_id = str(uuid.uuid4) # generates a unique id for the server
    chat_rooms[server_id] = {"name": server_name, "owner": owner_id, "members": [owner_id], "messages": [message]} # creates a new server with the provided data

    return jsonify({"server_id": server_id, "server_name": server_name}) # returns the server id and server name


# Define an event handler for 'send_message' events
@socketio.on('send_message')
def handle_message(data):
    message = data['message']
    # Broadcast the received message data to all connected clients
    #send(data, broadcast=True)
    socketio.emit('receive_message', {'message': message}, broadcast=True)

# # Define an event handler for 'connect' events
# @socketio.on('connect')
# def handle_connect():
#     # Send a message to the client when it connects
#     send('Connected')  

# Run the Flask application with SocketIO
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=4000)