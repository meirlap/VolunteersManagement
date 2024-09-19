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
            volunteer_data = {
                db_field: str(row[excel_field]) if pd.notna(row[excel_field]) else None
                for excel_field, db_field in volunteer_columns_mapping.items()
            }

            # חישוב קואורדינטות
            if volunteer_data['address']:
                lat, lng = get_coordinates(volunteer_data['address'])
                volunteer_data['latitude'] = lat
                volunteer_data['longitude'] = lng

            volunteer = Volunteer(**volunteer_data)
            db.session.add(volunteer)

        # שמירת השינויים למסד הנתונים
        try:
            db.session.flush()
            db.session.commit()
            print("Volunteers committed successfully.")
        except Exception as e:
            print(f"Commit failed for volunteers: {e}")
            db.session.rollback()

def import_needs():
    with app.app_context():
        for index, row in needs_df.iterrows():
            need_data = {
                db_field: str(row[excel_field]) if pd.notna(row[excel_field]) else None
                for excel_field, db_field in need_columns_mapping.items()
            }

            # חישוב קואורדינטות
            if need_data['address']:
                lat, lng = get_coordinates(need_data['address'])
                need_data['latitude'] = lat
                need_data['longitude'] = lng

            need = Need(**need_data)
            db.session.add(need)

        # שמירת השינויים למסד הנתונים
        try:
            db.session.flush()
            db.session.commit()
            print("Needs committed successfully.")
        except Exception as e:
            print(f"Commit failed for needs: {e}")
            db.session.rollback()

# קריאה לפונקציות להוספת הנתונים
import_volunteers()
import_needs()
