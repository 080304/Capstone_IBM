from flask import Flask, jsonify, request
from flask_cors import CORS # Untuk mengizinkan permintaan dari frontend Anda

app = Flask(__name__)
CORS(app) # Mengizinkan semua domain untuk pengembangan. Sesuaikan di produksi!

@app.route('/hello', methods=['GET'])
def hello_world():
    name = request.args.get('name', 'World')
    return jsonify(message=f'Hello from Flask API, {name}!')

@app.route('/data', methods=['POST'])
def process_data():
    data = request.json
    if data and 'item' in data:
        return jsonify(received_item=data['item'], status='success'), 200
    return jsonify(error='Invalid data'), 400

if __name__ == '__main__':
    app.run(debug=True)