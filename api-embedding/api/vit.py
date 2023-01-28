import requests
import json

def getEmbeddingVectorFromUrl(imageUrl):
    res = requests.post("http://localhost:3000/predictions/vit", json={
        "url": imageUrl
    })

    if res.status_code != 200:
        raise ValueError("error")
    
    result = json.loads(res.text)
    return result["vector"]
