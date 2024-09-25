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

    def serialize(self):
        return {
            "id": self.id,
            "timestamp": self.timestamp.isoformat() if self.timestamp else None,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "birth_date": self.birth_date,
            "phone": self.phone,
            "address": self.address,
            "id_number": self.id_number,
            "volunteer_field": self.volunteer_field,
            "volunteer_organization": self.volunteer_organization,
            "organization_name": self.organization_name,
            "neighborhood_only": self.neighborhood_only,
            "emergency_field": self.emergency_field,
            "military_reserve": self.military_reserve,
            "emergency_team": self.emergency_team,
            "additional_info": self.additional_info,
            "latitude": self.latitude,
            "longitude": self.longitude
        }

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


# מיפוי שמות העמודות בקובץ לעמודות ב-DB, בהתאמה מלאה לעמודות שבקבצים
volunteer_columns_mapping = {
    'שם פרטי': 'first_name',
    'שם משפחה': 'last_name',
    'תאריך לידה': 'birth_date',
    'נייד': 'phone',
    'כתובת מגורים': 'address',
    'תעודת זהות (לצורך ביטוח מתנדבים)': 'id_number',
    'תחום התנדבות בשגרה': 'volunteer_field',
    'מתנדב באירגון': 'volunteer_organization',
    'שם האירגון אליו אני משתייך': 'organization_name',
    'פועל.ת רק עבור אוכלוסית השכונה': 'neighborhood_only',
    'בשעת חרום אעדיף לפעול בתחום': 'emergency_field',
    'מילואים': 'military_reserve',
    'מוכן.ה להצטרף לצוות מערך החרום בשכונה (צח"ש)': 'emergency_team',
    'האם תרצו להגיד לנו משהו נוסף לגבי ההתנדבויות': 'additional_info'
}

need_columns_mapping = {
    'שם מלא': 'full_name',
    'כתובת מגורים': 'address',
    'מספר דירות בבניין': 'apartment_count',
    'נייד': 'phone',
    'האם יש לכם קבוצת ווטצאפ בבניין והאם כולם חברים בה?': 'whatsapp_group',
    'האם יש בבניין דיירים עם המאפיינים הבאים': 'special_residents',
    'האם יש צורך נוסף שחשוב לך שנדע עליו בשעת חרום': 'additional_needs',
    'האם תגיע לאירוע ההוקרה לועדי הבתים ב 16.7 ב 19:30 בשלוחת ארנונה': 'event_attendance'
}