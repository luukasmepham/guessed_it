import os
from flask import Flask, jsonify, render_template
import psycopg2
from datetime import date

DATABASE_URL = os.environ.get('DATABASE_URL')

app = Flask(__name__)
app.config['STATIC_FOLDER'] = 'static'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/new_question', methods=['GET'])
def new_question():

    try:
        today = date.today().strftime('%d%m%Y')

        conn = psycopg2.connect(DATABASE_URL, sslmode='require')
        cur = conn.cursor()

        cur.execute("SELECT description, id FROM descriptions WHERE date = %s", (today,))
        row = description = cur.fetchone()

        if not row:
            return jsonify({'error': 'No description found for today'}), 404
    
        description = row[0]
        description_id = row[1]

        cur.execute("SELECT answer FROM answers WHERE description_id = %s", (description_id,))
        answers = [row[0] for row in cur.fetchall()]
    
        cur.close() 
        conn.close()

        data = {
            'description': description,
            'answers': answers
        }

        return jsonify(data)
    except (Exception, psycopg2.Error) as e:
        print(f"Error fetching data: {e}")
        return jsonify({'error': 'Failed to fetch data'}), 500

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0', port=5000)
