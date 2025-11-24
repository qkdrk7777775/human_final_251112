from networks.calories import model

import numpy as np 
from PIL import Image
import torch
from torchvision import transforms


ckpt = torch.load("./backend/networks/calories/Regression/new_opencv_ckpt_b84_e200.pth", map_location=torch.device("cpu"))
model = ckpt["model_ft"]
model.load_state_dict(ckpt["state_dict"])
model.eval()

sample = r"c:\Users\human\Downloads\New_sample\원천데이터\합본_양추정_이미지_TRAIN\image\김밥\Q3\side_주먹밥김밥류_접시_김밥_Q3_00007.JPG"
pil_img = Image.open(sample)

test_transforms = transforms.Compose([
        transforms.Resize(256),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406],
                             std=[0.229, 0.224, 0.225])])

preprocess_data = test_transforms(pil_img)
input_tensor = np.expand_dims(preprocess_data, 0)
input_tensor = torch.from_numpy(input_tensor)

logits = model(input_tensor)
probs = logits.softmax(dim=-1)
topk = probs.cpu().topk(5)
topk = (e.data.numpy().squeeze().tolist() for e in topk)

class CaloriesModel:
    def __init__(self, weight_path):
        self.weight_path = weight_path
        self.setup()        
    def setup(self):
        ckpt = torch.load(
            self.weight_path, map_location=torch.device("cpu"))
        self.model = ckpt["model_ft"]
        self.model.load_state_dict(ckpt["state_dict"])
        self.model.eval()
        self.transforms = transforms.Compose([
            transforms.Resize(256),
            transforms.CenterCrop(224),
            transforms.ToTensor(),
            transforms.Normalize(
                mean=[0.485, 0.456, 0.406],
                std=[0.229, 0.224, 0.225])])
    def predict(self, pil_img):
        preprocess_data = self.transforms(pil_img)
        input_tensor = np.expand_dims(preprocess_data, 0)
        input_tensor = torch.from_numpy(input_tensor)
        logits = self.model(input_tensor)
        probs = logits.softmax(dim=-1)
        return probs

model_path = "./backend/networks/calories/Regression/new_opencv_ckpt_b84_e200.pth"
calories_model = CaloriesModel(weight_path=model_path)
pil_img = Image.open(sample)
calories_model.predict(pil_img)
