from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union
from image import getImageExifFromUrl

app = FastAPI()

class ExtractBody(BaseModel):
    imageUrl: str

@app.post("/extract")
def extractHandler(body: ExtractBody):
    try:
        imageUrl = body.imageUrl
        exifData = getImageExifFromUrl(imageUrl)
        return {
            "vector": []
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail="error")
