import os
import shutil
import torch
import logging
import json
import requests
from PIL import Image
from transformers import AutoImageProcessor, AutoModel

logger = logging.getLogger(__name__)

def loadImagesFromUrl(imageUrls):
    images = [Image.open(requests.get(url, stream=True).raw) for url in imageUrls]
    return images

class ViTHandler(object):
    def __init__(self):
        self.initialized = False
        self.model = None

    def initialize(self, context):
        # load the properties
        self.manifest = context.manifest
        properties = context.system_properties
        modelDir = properties.get("model_dir")
        self.device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

        # path checking - processor
        processorPath = os.path.join(modelDir, 'processor')
        if not os.path.exists(processorPath):
            os.makedirs(processorPath)
            shutil.copy(os.path.join(modelDir, 'preprocessor_config.json'), os.path.join(processorPath, 'preprocessor_config.json'))

        # path checking - model
        modelPath = os.path.join(modelDir, 'model')
        if not os.path.exists(modelPath):
            os.makedirs(modelPath)
            shutil.copy(os.path.join(modelDir, 'config.json'), os.path.join(modelPath, 'config.json'))
            shutil.copy(os.path.join(modelDir, 'pytorch_model.bin'), os.path.join(modelPath, 'pytorch_model.bin'))

        # load the processor and model
        self.imageProcessor = AutoImageProcessor.from_pretrained(processorPath)
        self.model = AutoModel.from_pretrained(modelPath)
        self.model.to(self.device)
        self.model.eval()
    
    def embedding(self, images):
        inputs = self.imageProcessor(images=images, return_tensors="pt").to(self.device)
        outputs = self.model(**inputs)
        outputs = outputs.pooler_output.cpu().detach().numpy().tolist()
        return outputs

    def handle(self, data, context):
        # download images from url
        imageUrls = [req['body']['url'] for req in data]
        images = loadImagesFromUrl(imageUrls)

        # embedding
        imageVecs = self.embedding(images)
        
        # response
        return [json.dumps({ "vector": vec }) for vec in imageVecs]
