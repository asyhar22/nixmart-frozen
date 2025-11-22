from PIL import Image
from pathlib import Path

SRC_DIR = Path(__file__).parent.parent.parent.parent
OUT_DIR = Path(__file__).parent

# Source filename preference: Logo_Nixmart.png else Hero_NixMart.png
src_candidates = ['Logo_Nixmart.png', 'Logo_NixMart.png']
source = None
for name in src_candidates:
    p = SRC_DIR / name
    if p.exists():
        source = p
        break

if source is None:
    print('No source logo found in', SRC_DIR)
    print('Checked:', src_candidates)
    raise SystemExit(1)

print('Using source:', source)

sizes = [ (180,60), (360,120), (48,48), (32,32) ]

for w,h in sizes:
    out_name_png = f'logo-{w}x{h}.png'
    out_name_webp = f'logo-{w}x{h}.webp'
    out_png = OUT_DIR / out_name_png
    out_webp = OUT_DIR / out_name_webp

    with Image.open(source) as im:
        # Preserve aspect: fit into box and pad transparent if needed
        im_ratio = im.width / im.height
        target_ratio = w / h

        if abs(im_ratio - target_ratio) < 0.02:
            # similar ratio, just resize
            resized = im.resize((w,h), Image.Resampling.LANCZOS)
        else:
            # fit and pad
            im.thumbnail((w,h), Image.Resampling.LANCZOS)
            # create transparent background
            new_im = Image.new('RGBA', (w,h), (255,255,255,0))
            x = (w - im.width) // 2
            y = (h - im.height) // 2
            new_im.paste(im, (x,y), im.convert('RGBA'))
            resized = new_im

        # Save PNG
        resized.save(out_png, 'PNG')
        # Save WebP
        resized.save(out_webp, 'WEBP', quality=85, method=6)

    print('Created', out_png, 'and', out_webp)

# Also create favicon.ico from 32x32 PNG
try:
    ico_src = OUT_DIR / 'logo-32x32.png'
    if ico_src.exists():
        ico_out = OUT_DIR / 'favicon.ico'
        with Image.open(ico_src) as im:
            im.save(ico_out, format='ICO', sizes=[(32,32)])
        print('Created', ico_out)
except Exception as e:
    print('Failed creating favicon.ico:', e)
