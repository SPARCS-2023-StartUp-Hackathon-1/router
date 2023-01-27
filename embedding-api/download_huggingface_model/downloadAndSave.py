import os
import sys
import torch
from transformers import AutoImageProcessor, AutoModel

def downloadAndSave(modelName):
    # device setting
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    # load pretrained processor and model
    processor = AutoImageProcessor.from_pretrained(modelName)
    model = AutoModel.from_pretrained(modelName)
    model.to(device)
    
    # save processor
    saveDir = 'processor'
    if not os.path.exists(saveDir): os.makedirs(saveDir)
    processor.save_pretrained(saveDir)

    # save model
    saveDir = 'model'
    if not os.path.exists(saveDir): os.makedirs(saveDir)
    model.save_pretrained(saveDir)

if __name__== "__main__":
    modelName = "google/vit-base-patch16-224" if len(sys.argv) < 2 else sys.argv[1]
    downloadAndSave(modelName)
