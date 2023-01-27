from PIL import Image
from PIL.ExifTags import TAGS
import requests

def getImageExifFromUrl(imageUrl):
    image = Image.open(requests.get(imageUrl, stream=True).raw)
    image = Image.open("mandoo1.HEIC")
    imageInfo = image._getexif()
    imageTagDict = {}
    for tag, value in imageInfo.items():
        decoded = TAGS.get(tag, tag)
        imageTagDict[decoded] = value
    # print(image)
    # print(imageTagDict)
    # print(imageTagDict['GPSInfo'])
