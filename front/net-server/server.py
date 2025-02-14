from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")

# Store created chat servers
servers = []

# Handle real-time messaging
@socketio.on('send_message')
def handle_message(data):
    send(data, broadcast=True)

# Create a new chat server
@app.route('/create_server', methods=['POST'])
def create_server():
    data = request.get_json()
    
    new_server = {
        'id': len(servers) + 1,
        'name': data.get('name', 'Untitled Server'),
        'owner': data.get('owner', 'Unknown')
    }
    
    servers.append(new_server)
    return jsonify(servers), 201

# Get all chat servers
@app.route('/create_server', methods=['GET'])
def get_servers():
    return jsonify(servers), 200

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=4000, debug=True)
