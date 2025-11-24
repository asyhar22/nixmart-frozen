from PIL import Image
from pathlib import Path

# Configuration
HERO_DIR = Path(__file__).parent / "assets" / "img" / "hero"
INPUT_FILE = HERO_DIR / "New.png"
QUALITY = 85

# Size configurations matching existing hero images
SIZES = {
    "small": 600,      # Hero_NixMart_small.webp
    "medium": 1024,    # Hero_NixMart_medium.webp
    "large": 1600,     # Hero_NixMart_large.webp
}

def convert_hero_images():
    """Convert New.png to optimized webp sizes"""
    if not INPUT_FILE.exists():
        print(f"Error: {INPUT_FILE} not found")
        return
    
    try:
        # Open the source image
        img = Image.open(INPUT_FILE)
        print(f"Opened: {INPUT_FILE}")
        print(f"Original dimensions: {img.size}")
        
        # Convert to RGB if necessary (for PNG with transparency)
        if img.mode in ('RGBA', 'LA', 'P'):
            rgb_img = Image.new('RGB', img.size, (255, 255, 255))
            rgb_img.paste(img, mask=img.split()[-1] if img.mode == 'RGBA' else None)
            img = rgb_img
        
        # Create resized versions
        for size_name, width in SIZES.items():
            ratio = width / float(img.size[0])
            height = int(float(img.size[1]) * ratio)
            
            img_resized = img.resize((width, height), Image.Resampling.LANCZOS)
            
            output_file = HERO_DIR / f"Hero_NixMart_{size_name}.webp"
            img_resized.save(output_file, "WEBP", quality=QUALITY, method=6)
            print(f"✓ Created: {output_file} ({width}x{height})")
        
        # Also create a .png version for fallback
        png_output = HERO_DIR / "Hero_NixMart_large.png"
        img_large = img.resize((1600, int(img.size[1] * 1600 / img.size[0])), Image.Resampling.LANCZOS)
        img_large.save(png_output, "PNG", optimize=True)
        print(f"✓ Created: {png_output}")
        
        print("\n✓ All hero images converted successfully!")
        
    except Exception as e:
        print(f"✗ Error: {e}")

if __name__ == "__main__":
    convert_hero_images()
