from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union
from datetime import datetime
from image import getImageExifFromUrl
from vit import getEmbeddingVectorFromUrl

app = FastAPI()

class ExtractBody(BaseModel):
    imageUrl: str

@app.post("/extract")
def extractHandler(body: ExtractBody):
    try:
        imageUrl = body.imageUrl
        datetime, latitude, longitude = getImageExifFromUrl(imageUrl)
        vector = getEmbeddingVectorFromUrl(body.imageUrl)
        return {
            "datetime": datetime,
            "latitude": latitude,
            "longitude": longitude,
            "vector": vector,
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="error")
