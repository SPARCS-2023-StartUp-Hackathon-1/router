from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union
from datetime import datetime
from image import getImageExifFromUrl

app = FastAPI()

class ExtractBody(BaseModel):
    imageUrl: str

@app.post("/extract")
def extractHandler(body: ExtractBody):
    try:
        imageUrl = body.imageUrl
        datetime, latitude, longitude = getImageExifFromUrl(imageUrl)
        # TODO : image 2 embbding
        return {
            "datetime": datetime,
            "latitude": latitude,
            "longitude": longitude,
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="error")
