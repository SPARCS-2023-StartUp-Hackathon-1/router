from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union
from datetime import datetime
from image import getImageExifFromUrl
from vit import getEmbeddingVectorFromUrl

import pandas as pd


app = FastAPI()

class ExtractBody(BaseModel):
    imageUrl: str

class clusteringBody(BaseModel):
    time: datetime #??
    latitude: float
    longitude: float
    vector: List # ??
    valid: bool

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

@app.post("/clustering")
def clusteringHandler(body: [clusteringBody]):
    try:
        sort_body = body.sorted(key=lambda x: x[0]) # sort by date
        groupby_date =[]
        subgroup = [sort_body[0]]
        for i in range(1, len(image)):
            if sort_body[i-1].datetime != sort_body[i].datetime:
                groupby_date.append(subgroup)
                subgroup=[]
            else:
                subgroup.append(sort_body[i-1])







        # group by date
        # in date group, group by lati,logitude
        # return result



            



