from logging import raiseExceptions
import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel
from typing import List
from sklearn.preprocessing import StandardScaler

# Định nghĩa input từ người dùng
class PredictionInput(BaseModel):
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

class PredictionOutput(BaseModel):
    prediction: str

class StudentRetentionModel:
    def __init__(self):
        with open('model.pkl', 'rb') as f:
            self.model = pickle.load(f)

        self.target_mapping = {0: 'Dropout', 1: 'Graduate'}

    def preprocess_input(self, input_data: PredictionInput):
        ordered_columns = [
            'Marital_status', 'Application_mode', 'Course', 'Daytime/evening_attendance',
            'Previous_qualification', 'Mother_qualification', 'Father_qualification',
            'Mother_occupation', 'Father_occupation', 'Displaced', 'Debtor',
            'Tuition_fees_up_to_date', 'Gender', 'Scholarship_holder',
            'Age_at_enrollment', 'avg_enrolled', 'avg_approved', 'avg_grade'
        ]

        data_dict = input_data.dict()
        data_dict['Daytime/evening_attendance'] = data_dict.pop('Daytime_evening_attendance')

        # Không dùng preprocessor, chỉ tạo đúng thứ tự
        X = pd.DataFrame([[data_dict[col] for col in ordered_columns]], columns=ordered_columns)

        print("Input đưa vào model:", X.values.tolist())
        return X.values 

    def predict(self, input_data: PredictionInput):
        X_processed = self.preprocess_input(input_data)
        prediction = self.model.predict(X_processed)[0]
        print(prediction)
        return {"prediction": self.target_mapping[prediction]}


# Khởi tạo mô hình để dùng trong FastAPI
model = StudentRetentionModel()
