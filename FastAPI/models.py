from sqlalchemy import Column, Integer, Float, String
from database import Base

class StudentPrediction(Base):
    __tablename__ = "student_predictions"

    id = Column(Integer, primary_key=True, index=True)
    Marital_status = Column(Integer)
    Application_mode = Column(Integer)
    Course = Column(Integer)
    Daytime_evening_attendance = Column(Integer, name="Daytime/evening_attendance")
    Previous_qualification = Column(Integer)
    Mother_qualification = Column(Integer)
    Father_qualification = Column(Integer)
    Mother_occupation = Column(Integer)
    Father_occupation = Column(Integer)
    Displaced = Column(Integer)
    Debtor = Column(Integer)
    Tuition_fees_up_to_date = Column(Integer)
    Gender = Column(Integer)
    Scholarship_holder = Column(Integer)
    Age_at_enrollment = Column(Integer)
    avg_enrolled = Column(Float)
    avg_approved = Column(Float)
    avg_grade = Column(Float)

    # Dự đoán đầu ra
    prediction = Column(String)











