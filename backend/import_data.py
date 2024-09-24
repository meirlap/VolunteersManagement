from app import app
import pandas as pd
from models import db, Volunteer, Need
from services import get_coordinates

# קריאה של הקבצים עם המתנדבים והצרכים
volunteers_df = pd.read_excel('./map_vl.xlsx')
needs_df = pd.read_excel('./map_need.xlsx')

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

def import_volunteers():
    with app.app_context():
        for index, row in volunteers_df.iterrows():
            phone = str(row['נייד']) if pd.notna(row['נייד']) else None
            volunteer = Volunteer.query.filter_by(phone=phone).first()

            if not volunteer:
                volunteer = Volunteer()
                db.session.add(volunteer)

            for excel_field, db_field in volunteer_columns_mapping.items():
                value = str(row[excel_field]) if pd.notna(row[excel_field]) else None
                setattr(volunteer, db_field, value)

            if volunteer.address:
                full_address = volunteer.address + ", ירושלים" if '@' not in volunteer.address and 'ירושלים' not in volunteer.address.lower() else volunteer.address
                lat, lng = get_coordinates(full_address)
                volunteer.latitude = lat
                volunteer.longitude = lng

        try:
            db.session.commit()
            print("Volunteers data imported and committed successfully.")
        except Exception as e:
            print(f"Failed to commit volunteer data: {e}")
            db.session.rollback()


def import_needs():
    with app.app_context():
        for index, row in needs_df.iterrows():
            phone = str(row['נייד']) if pd.notna(row['נייד']) else None
            need = Need.query.filter_by(phone=phone).first()

            if not need:
                need = Need()
                db.session.add(need)

            for excel_field, db_field in need_columns_mapping.items():
                value = str(row[excel_field]) if pd.notna(row[excel_field]) else None
                setattr(need, db_field, value)

            if need.address:
                full_address = need.address + ", ירושלים" if '@' not in need.address and 'ירושלים' not in need.address.lower() else need.address
                lat, lng = get_coordinates(full_address)
                need.latitude = lat
                need.longitude = lng

        try:
            db.session.commit()
            print("Needs data imported and committed successfully.")
        except Exception as e:
            print(f"Failed to commit needs data: {e}")
            db.session.rollback()


# קריאה לפונקציות להוספת הנתונים
import_volunteers()
import_needs()
