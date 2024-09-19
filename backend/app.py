from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from routes import init_routes
import os
from config import Config
from models import db  # ייבוא db מהמודלים

app = Flask(__name__)
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

if __name__ == '__main__':
    app.run(debug=True)
