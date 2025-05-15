from pydantic import BaseModel

class StudentPredictionBase(BaseModel):
    Age: float
    avg_enrolled: float
    avg_approved: float
    avg_grade: float
    avg_without_evaluations: float

    Marital_status: int
    Application_mode: int
    Application_order: int
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

class StudentPredictionResponse(StudentPredictionBase):
    id: int
    prediction: str

    class Config:
        orm_mode = True
