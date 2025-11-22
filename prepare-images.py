from PIL import Image
import os
from pathlib import Path

# Configuration
IMAGE_DIR = Path(__file__).parent
OUTPUT_DIR = Path(__file__).parent
SIZES = {
    "sm": 400,
    "md": 800,
    "lg": 1200
}
QUALITY = 85

def setup_directories():
    """Create output directory structure"""
    for size in SIZES.keys():
        (OUTPUT_DIR / size).mkdir(parents=True, exist_ok=True)

def resize_image(input_path, output_dir, width, quality=QUALITY):
    """Resize image and maintain aspect ratio"""
    try:
        img = Image.open(input_path)
        ratio = width / float(img.size[0])
        height = int(float(img.size[1]) * ratio)
        
        img_resized = img.resize((width, height), Image.Resampling.LANCZOS)
        filename = input_path.stem + ".webp"
        output_path = output_dir / filename
        
        img_resized.save(output_path, "WEBP", quality=quality, method=6)
        print(f"✓ Created: {output_path}")
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")

def main():
    setup_directories()
    
    if not IMAGE_DIR.exists():
        print(f"Source directory not found: {IMAGE_DIR}")
        print("Please ensure images are in the 'source' subdirectory")
        return
    
    source_images = list(IMAGE_DIR.glob("*.jpg")) + list(IMAGE_DIR.glob("*.png"))
    
    if not source_images:
        print("No images found in source directory")
        return
    
    print(f"Found {len(source_images)} images to process\n")
    
    for size_name, width in SIZES.items():
        print(f"\nProcessing {size_name.upper()} variants ({width}px):")
        for img_path in source_images:
            resize_image(img_path, OUTPUT_DIR / size_name, width)

if __name__ == "__main__":
    main()
