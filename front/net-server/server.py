from flask import Flask
from flask_socketio import SocketIO, send

# Initialize the Flask application
app = Flask(__name__)
# Set a secret key for the Flask application
app.config['SECRET_KEY'] = 'secret!'
# Initialize SocketIO with the Flask app, allowing cross-origin requests
socketio = SocketIO(app, cors_allowed_origins="*")

# Define an event handler for 'send_message' events
@socketio.on('send_message')
def handle_message(data):
    # Broadcast the received message data to all connected clients
    send(data, broadcast=True)

# Run the Flask application with SocketIO
if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=4000)