from cv2 import destroyAllWindows
from fastapi import APIRouter

from app.core.utils import preprocess_image, read_text

router = APIRouter(prefix="/expenses", tags=["expenses"])


@router.post("/upload")
def upload_bill():
    preprocess_image()
    text = read_text()
    return text
