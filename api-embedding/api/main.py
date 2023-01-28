from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union
from datetime import datetime
from image import getImageExifFromUrl
from vit import getEmbeddingVectorFromUrl
from cluster import dist, diff

import pandas as pd

app = FastAPI()

class ExtractBody(BaseModel):
    imageUrl: str

class clusteringBody(BaseModel):
    time: datetime
    latitude: float
    longitude: float

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
        images = body.images
        sort_body = images.sorted(key=lambda x: x[0]) # sort by date
        startTime = sort_body[0].time.date
        endTime = sort_body[-1].time.date
        
        cluster =[]
        subgroup = [sort_body[0]]
        for i in range(1, len(image)):
            if 3600 < diff(sort_body[i-1].datetime, sort_body[i].datetime) and 1 < dist(sort_body[i-1].latitude, sort_body[i-1].longitude, sort_body[i].latitude, sort_body[i].longitude):
                cluster.append(subgroup)
                subgroup=[]
            else:
                subgroup.append(sort_body[i])
        return {
            "cluster" : cluster,
            "startTime" : startTime,
            "endTime": endTime,
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="error")




        
