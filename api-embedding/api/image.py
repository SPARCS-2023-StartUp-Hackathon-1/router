# from PIL import Image
# from PIL.ExifTags import TAGS
import exifread
import requests
from datetime import datetime
from io import BytesIO

def getGPSInfoFromStr(ref, value):
    ref, value = str(ref), str(value)
    values = value.replace('[', '').replace(']', '').replace(' ', '').split(',')
    assert len(values) >= 1 and len(values) <= 3
    assert ref in ['N', 'S', 'E', 'W']

    values = [(float(v.split('/')[0])/float(v.split('/')[1]) if v.find('/') >=0 else float(v)) for v in values]
    value = values[0] + (values[1] if len(values) >= 2 else 0)/60 + (values[2] if len(values) >= 3 else 0)/3600
    if ref in ['S', 'W']: value = -value
    return value

def getDatetimeInfoFromStr(value):
    value = str(value)
    return datetime.strptime(value, '%Y:%m:%d %H:%M:%S')

def getImageExifFromUrl(imageUrl):
    res = requests.get(imageUrl)
    imageStream = BytesIO(res.content)
    imageInfo = exifread.process_file(imageStream)
    datetime = getDatetimeInfoFromStr(imageInfo['Image DateTime'])
    latitude = getGPSInfoFromStr(imageInfo['GPS GPSLatitudeRef'], imageInfo['GPS GPSLatitude'])
    longitude = getGPSInfoFromStr(imageInfo['GPS GPSLongitudeRef'], imageInfo['GPS GPSLongitude'])
    return datetime, latitude, longitude
