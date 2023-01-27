from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Union

app = FastAPI()

class EmbeddingBody(BaseModel):
    imageUrls: List[str]

@app.post("/embedding")
def embeddingHandler(body: EmbeddingBody):
    try:
        return {
            "vector": []
        }
    except Exception as e:
        raise HTTPException(status_code=400, detail="error")
