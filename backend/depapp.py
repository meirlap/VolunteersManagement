from flask import Flask, send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from routes import init_routes
import os
from config import Config
from models import db  # ייבוא db מהמודלים

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
app.config.from_object(Config)

# לאפשר קריאות בין דומיינים
CORS(app)

# אתחול מסד הנתונים
db.init_app(app)

# יצירת הטבלאות במסד הנתונים אם הן לא קיימות
with app.app_context():
    db.create_all()

# אתחול הנתיבים מהקובץ routes.py
init_routes(app)

# ניתוב עבור קבצים סטטיים מהתיקייה build של הפרונט-אנד
@app.route('/')
def serve():
    return send_from_directory(app.static_folder, 'index.html')

# ניתוב עבור כל הנתיבים האחרים שלא תואמים ל-API
@app.errorhandler(404)
def not_found(e):
    return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
