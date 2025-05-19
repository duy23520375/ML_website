from pydantic import BaseModel

class StudentPredictionBase(BaseModel):
    Marital_status: int
    Application_mode: int
    Course: int
    Daytime_evening_attendance: int
    Previous_qualification: int
    Mother_qualification: int
    Father_qualification: int
    Mother_occupation: int
    Father_occupation: int
    Displaced: int
    Debtor: int
    Tuition_fees_up_to_date: int
    Gender: int
    Scholarship_holder: int
    Age_at_enrollment: int
    avg_enrolled: float
    avg_approved: float
    avg_grade: float

    

class StudentPredictionResponse(StudentPredictionBase):
    id: int
    prediction: str

    class Config:
        orm_mode = True
