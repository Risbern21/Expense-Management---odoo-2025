import cv2
import pytesseract
from PIL import Image


def preprocess_image():
    # Load image
    image = cv2.imread("app/core/image.png")
    if image is None:
        raise FileNotFoundError("image not found")

    # Convert to grayscale
    gray = cv2.cvtColor(image, cv2.COLOR_BGRA2GRAY)

    # Apply thresholding (binarization)
    thresh = cv2.threshold(
        gray, 150, 255, cv2.THRESH_BINARY_INV | cv2.THRESH_OTSU
    )[1]

    # Optional: Remove noise
    thresh = cv2.medianBlur(thresh, 3)

    # Save preprocessed image (for debugging)
    cv2.imwrite("app/core/preprocessed.png", thresh)


def read_text() -> str:
    image = cv2.imread("app/core/preprocessed.png")
    if image is None:
        raise FileNotFoundError("file not found for reading text")
    text = pytesseract.image_to_string(image)

    return text
