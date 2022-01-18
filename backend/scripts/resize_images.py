from PIL import Image
import os


directory = r'C:\Users\CCHay\Desktop\fixed_images'
for filename in os.listdir(directory):
    print(f"Working on {filename}")
    if filename.endswith(".png"):
        size = 163, 270
        im = Image.open(f"{directory}/{filename}")
        im_resized = im.resize(size, Image.ANTIALIAS)
        im_resized.save(f"{directory}/fixed/{filename}")
