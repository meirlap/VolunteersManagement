# models.py
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, Integer, String, Text, DateTime, Float

db = SQLAlchemy()

# הגדרת הטבלה לניהול מתנדבים
class Volunteer(db.Model):
    __tablename__ = 'volunteer'
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, nullable=True)
    first_name = Column(String, nullable=True)
    last_name = Column(String, nullable=True)
    birth_date = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    address = Column(String, nullable=True)
    id_number = Column(String, nullable=True)
    volunteer_field = Column(String, nullable=True)
    volunteer_organization = Column(String, nullable=True)
    organization_name = Column(String, nullable=True)
    neighborhood_only = Column(String, nullable=True)
    emergency_field = Column(String, nullable=True)
    military_reserve = Column(String, nullable=True)
    emergency_team = Column(String, nullable=True)
    additional_info = Column(Text, nullable=True)

# הגדרת הטבלה לניהול צרכים בשכונה
class Need(db.Model):
    __tablename__ = 'need'
    latitude = Column(Float, nullable=True)
    longitude = Column(Float, nullable=True)
    id = Column(Integer, primary_key=True)
    timestamp = Column(DateTime, nullable=True)
    full_name = Column(String, nullable=True)
    address = Column(String, nullable=True)
    apartment_count = Column(Integer, nullable=True)
    phone = Column(String, nullable=True)
    whatsapp_group = Column(String, nullable=True)
    special_residents = Column(String, nullable=True)
    additional_needs = Column(Text, nullable=True)
    event_attendance = Column(String, nullable=True)
