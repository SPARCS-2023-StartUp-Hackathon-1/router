from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union
from datetime import datetime
from image import getImageExifFromUrl
from vit import getEmbeddingVectorFromUrl
from cluster import clusteringLarge, clusteringDeep, clusters2res

app = FastAPI()

class ExtractBody(BaseModel):
    imageUrl: str

class ImageInfo(BaseModel):
    id: str
    url: str
    time: datetime
    latitude: float
    longitude: float
    vector: List[float]

class ClusteringBody(BaseModel):
    images: List[ImageInfo]

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
def clusteringHandler(body: ClusteringBody):
    try:
        # sort by date
        images = [dict(image) for image in body.images]
        images = sorted(images, key=lambda x: x["time"])
        
        # extract start&end date
        startTime = images[0]["time"] # to string
        endTime = images[-1]["time"] # to string
        
        # clustering Large
        clusters = clusteringLarge(images)

        # clustering Deep
        clustersV2 = [clusteringDeep(cluster) for cluster in clusters]
        
        return {
            "clusters": clusters2res(clustersV2),
            "startTime" : startTime,
            "endTime": endTime,
        }
    except Exception as e:
        print(e)
        raise HTTPException(status_code=400, detail="error")
