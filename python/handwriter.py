import pywhatkit as kit
import cv2

kit.text_to_handwriting('Hello, how are you today?', save_to="handwritting.png")

img = cv2.imread("handwritting.png")
cv2.imshow("Text to Handwritting", img)

cv2.waitKey(0)
cv2.destroyAllWindows()