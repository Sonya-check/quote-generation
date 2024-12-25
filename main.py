from flask import Flask, request, jsonify, render_template
import sqlite3
import requests
import smtplib
from email.mime.text import MIMEText

app = Flask(__name__)

DATABASE = 'quotes.db'


def init_db():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS quotes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            quote TEXT NOT NULL,
            author TEXT NOT NULL,
            category TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()


@app.route('/')
def index():
    return render_template('index.html')


@app.route('/add_quote', methods=['POST'])
def add_quote():
    data = request.json
    quote = data.get('quote')
    author = data.get('author')
    category = data.get('category')

    if not quote or not author or not category:
        return jsonify({'error': 'All fields are required'}), 400

    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('INSERT INTO quotes (quote, author, category) VALUES (?, ?, ?)', (quote, author, category))
    conn.commit()
    conn.close()

    return jsonify({'success': True}), 201


@app.route('/get_quotes', methods=['GET'])
def get_quotes():
    conn = sqlite3.connect(DATABASE)
    cursor = conn.cursor()
    cursor.execute('SELECT quote, author, category FROM quotes')
    quotes = cursor.fetchall()
    conn.close()

    return jsonify(quotes)


@app.route('/get_random_quote_api', methods=['GET'])
def get_random_quote_api():
    response = requests.get('https://zenquotes.io/api/random')
    if response.status_code == 200:
        return jsonify(response.json()[0])
    else:
        return jsonify({'error': 'Failed to fetch quote from API'}), 500


@app.route('/send_quote_to_email', methods=['POST'])
def send_quote_to_email():
    data = request.json
    email = data.get('email')
    quote = data.get('quote')
    author = data.get('author')

    if not email or not quote or not author:
        return jsonify({'error': 'Email, quote, and author are required'}), 400

    msg = MIMEText(f'"{quote}" - {author}')
    my_gmail = 'artemsafin67@gmail.com'
    my_secret_code = 'ysuf uoux xexa jwry'
    msg['Subject'] = 'Цитата дня'
    msg['From'] = my_gmail
    msg['To'] = email

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(my_gmail, my_secret_code)
            server.sendmail(my_gmail, email, msg.as_string())
        return jsonify({'success': True}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    init_db()
    app.run(debug=True)