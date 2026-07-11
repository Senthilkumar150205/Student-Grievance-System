import os

class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY', 'student_grievance_secret_key_987654321_key')
    
    # MySQL Database Connection configuration
    DB_HOST = os.environ.get('DB_HOST', 'localhost')
    DB_USER = os.environ.get('DB_USER', 'root')
    DB_PASSWORD = os.environ.get('DB_PASSWORD', '1505')
    DB_NAME = os.environ.get('DB_NAME', 'student_grievance')
    DB_PORT = int(os.environ.get('DB_PORT', 3306))
    
    # File upload configurations
    UPLOAD_FOLDER = os.path.join(os.path.abspath(os.path.dirname(__file__)), 'static', 'uploads')
    MAX_CONTENT_LENGTH = 16 * 1024 * 1024  # 16 MB limit
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif', 'pdf', 'doc', 'docx'}
