from logging import raiseExceptions
import pickle
import numpy as np
import pandas as pd
from pydantic import BaseModel
from typing import List
from sklearn.preprocessing import StandardScaler

# Định nghĩa input từ người dùng
class PredictionInput(BaseModel):
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

class PredictionOutput(BaseModel):
    prediction: str

class StudentRetentionModel:
    def __init__(self):
        # Load mô hình và preprocessor từ file
        with open('model.pkl', 'rb') as f:
            self.model = pickle.load(f)
        with open('preprocessor.pkl', 'rb') as f:
            self.preprocessor = pickle.load(f)

        # Mapping kết quả mô hình về tên nhãn
        self.target_mapping = {0: 'Dropout', 1: 'Enrolled', 2: 'Graduate'}

    def preprocess_input(self, input_data: PredictionInput):
        # Chuyển Pydantic thành dict rồi thành DataFrame
        data_dict = input_data.dict()
        df = pd.DataFrame([data_dict])
        
        df = df.rename(columns={'Daytime_evening_attendance': 'Daytime/evening_attendance'})

        # Cột phải đúng thứ tự như lúc huấn luyện
        return self.preprocessor.transform(df)

    def predict(self, input_data: PredictionInput):
        # Tiền xử lý đầu vào
        X_processed = self.preprocess_input(input_data)

        # Chỉ dự đoán kết quả, không tính xác suất
        prediction = self.model.predict(X_processed)[0]
        # raise Exception(prediction)
        return {
            # "prediction": prediction
            "prediction": self.target_mapping[prediction]

        }

# Khởi tạo mô hình để dùng trong FastAPI
model = StudentRetentionModel()
