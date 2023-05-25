from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)  # Adiciona o middleware Flask-CORS

mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Mdsqlmn0.",
    database="siris"
)

@app.route('/login', methods=['POST'])
def login():
    try:
        username = request.json['username']
        password = request.json['password']

        mycursor = mydb.cursor()
        sql = "SELECT * FROM users WHERE username = %s AND password = %s"
        val = (username, password)
        mycursor.execute(sql, val)
        result = mycursor.fetchone()

        if result:
            role = result[3]  # Assuming the 'role' column is at index 3 in the result
            if role == 0:  # User
                return jsonify({'message': 'Login successful', 'role': 'User'})
            elif role == 1:  # Administrator
                return jsonify({'message': 'Login successful', 'role': 'Administrator'})
        else:
            return jsonify({'message': 'Invalid username or password'})

    except Exception as e:
        return jsonify({'message': 'Error occurred', 'error': str(e)})

if __name__ == '__main__':
    app.run()
