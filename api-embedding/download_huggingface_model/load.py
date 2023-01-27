from transformers import AutoImageProcessor, AutoModel

def load():
    processor = AutoImageProcessor.from_pretrained("processor")
    model = AutoModel.from_pretrained("model")

if __name__== "__main__":
    load()
