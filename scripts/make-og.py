from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
logo = Image.open(ROOT / "src/assets/logo-new.png").convert("RGBA")

W, H = 1200, 630
# Brand gradient background (matches PageHeader: deep teal -> teal -> blue)
bg = Image.new("RGB", (W, H))
c0 = (1, 103, 123)
c1 = (11, 138, 135)
c2 = (20, 82, 159)
px = bg.load()
for x in range(W):
    t = x / (W - 1)
    if t < 0.55:
        k = t / 0.55
        a, b = c0, c1
    else:
        k = (t - 0.55) / 0.45
        a, b = c1, c2
    col = tuple(int(a[i] + (b[i] - a[i]) * k) for i in range(3))
    for y in range(H):
        px[x, y] = col

# soft dark vignette at the bottom for text readability
vig = Image.new("L", (W, H), 0)
dv = ImageDraw.Draw(vig)
dv.rectangle([0, H * 0.45, W, H], fill=90)
vig = vig.filter(ImageFilter.GaussianBlur(120))
bg = Image.composite(Image.new("RGB", (W, H), (3, 22, 28)), bg, vig)

canvas = Image.new("RGBA", (W, H), (0, 0, 0, 0))
canvas.paste(bg, (0, 0))

# logo, centered, on a white rounded card
card_w, card_h = 300, 300
logo_big = logo.resize((240, 215), Image.LANCZOS)
card = Image.new("RGBA", (card_w, card_h), (255, 255, 255, 255))
mask = Image.new("L", (card_w, card_h), 0)
dm = ImageDraw.Draw(mask)
dm.rounded_rectangle([0, 0, card_w - 1, card_h - 1], radius=48, fill=255)
card.putalpha(mask)
card.alpha_composite(logo_big, ((card_w - 240) // 2, (card_h - 215) // 2))
canvas.alpha_composite(card, ((W - card_w) // 2, 70))

d = ImageDraw.Draw(canvas)

def font(size, bold=False, italic=False):
    cands = []
    if bold and italic:
        cands = ["georgiab.ttf", "Georgia Bold Italic.ttf"]
    elif bold:
        cands = ["georgiabd.ttf", "Georgia Bold.ttf", "georgiab.ttf"]
    elif italic:
        cands = ["georgiai.ttf", "Georgia Italic.ttf"]
    else:
        cands = ["georgia.ttf", "Georgia.ttf"]
    import os
    windir = os.environ.get("WINDIR", r"C:\Windows")
    for c in cands:
        p = os.path.join(windir, "Fonts", c)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    for c in ["arial.ttf", "calibri.ttf"]:
        p = os.path.join(windir, "Fonts", c)
        if os.path.exists(p):
            return ImageFont.truetype(p, size)
    return ImageFont.load_default()

def center(text, y, f, fill):
    box = d.textbbox((0, 0), text, font=f)
    d.text(((W - (box[2] - box[0])) / 2, y), text, font=f, fill=fill)

GOLD = (214, 178, 94, 255)
WHITE = (255, 255, 255, 255)
SOFT = (255, 255, 255, 205)

center("Agensi Pekerjaan Veracare", 410, font(52, bold=True), WHITE)
center("Sincere Care, Service with Heart", 486, font(34, italic=True), GOLD)
center("Licensed Domestic Helper Agency · Penang", 545, font(24), SOFT)

out = ROOT / "public/og-image.png"
out.parent.mkdir(exist_ok=True)
canvas.convert("RGB").save(out, "PNG")
print("saved", out, canvas.size)
