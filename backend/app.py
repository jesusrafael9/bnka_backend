from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from flasgger import Swagger

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///database.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)

# Inicializar Flasgger
swagger = Swagger(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    balance = db.Column(db.Float, default=0.0)

class Transaction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    type = db.Column(db.String(10), nullable=False)  # 'deposito' o 'retiro'
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

# Endpoints
@app.route('/register', methods=['POST'])
def register():
    """
    Registrar un nuevo usuario
    ---
    tags:
      - Usuarios
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            name:
              type: string
              example: "Carlos"
            email:
              type: string
              example: "carlos@example.com"
            password:
              type: string
              example: "securepassword"
    responses:
      200:
        description: Usuario registrado exitosamente
      400:
        description: Faltan datos o usuario existente
    """
    data = request.get_json()
    if not all(key in data for key in ['name', 'email', 'password']):
        return jsonify({"error": "Faltan datos"}), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({"error": "El usuario ya existe con este correo electrónico"}), 400

    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "Usuario registrado exitosamente", "user_id": new_user.id})

@app.route('/balance/<int:user_id>', methods=['GET'])
def balance(user_id):
    """
    Obtener el balance de un usuario
    ---
    tags:
      - Usuarios
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: ID del usuario
    responses:
      200:
        description: Balance del usuario
      404:
        description: Usuario no encontrado
    """
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    return jsonify({"balance": user.balance})

@app.route('/transaction', methods=['POST'])
def transaction():
    """
    Crear una transacción
    ---
    tags:
      - Transacciones
    parameters:
      - name: body
        in: body
        required: true
        schema:
          type: object
          properties:
            user_id:
              type: integer
              example: 1
            type:
              type: string
              enum: ['deposito', 'retiro']
              example: "deposito"
            amount:
              type: number
              example: 100.0
    responses:
      200:
        description: Transacción realizada
      400:
        description: Error en los datos o saldo insuficiente
      404:
        description: Usuario no encontrado
    """
    data = request.get_json()
    if not all(key in data for key in ['user_id', 'type', 'amount']):
        return jsonify({"error": "Faltan datos"}), 400

    user = User.query.get(data['user_id'])
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    if data['type'] == 'retiro' and user.balance < data['amount']:
        return jsonify({"error": "Saldo insuficiente"}), 400

    new_transaction = Transaction(user_id=user.id, type=data['type'], amount=data['amount'])
    user.balance += data['amount'] if data['type'] == 'deposito' else -data['amount']
    db.session.add(new_transaction)
    db.session.commit()

    return jsonify({"message": "Transacción realizada", "balance": user.balance})

@app.route('/transactions/<int:user_id>', methods=['GET'])
def transactions(user_id):
    """
    Obtener transacciones de un usuario
    ---
    tags:
      - Transacciones
    parameters:
      - name: user_id
        in: path
        type: integer
        required: true
        description: ID del usuario
    responses:
      200:
        description: Lista de transacciones
      404:
        description: Usuario no encontrado
    """
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "Usuario no encontrado"}), 404

    transactions = Transaction.query.filter_by(user_id=user_id).all()
    return jsonify([{"type": t.type, "amount": t.amount, "date": t.date} for t in transactions])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
        print("Tablas creadas en la base de datos.")
    app.run(host='0.0.0.0', port=5000, debug=True)
