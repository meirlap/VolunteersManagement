import os
from dotenv import load_dotenv

# טוען את משתני הסביבה מקובץ .env
load_dotenv()

class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'default_secret_key')
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    GOOGLE_API_KEY = os.getenv('GOOGLE_API_KEY')
