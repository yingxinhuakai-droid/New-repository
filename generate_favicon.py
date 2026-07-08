from PIL import Image, ImageDraw

size = 64
img = Image.new('RGBA', (size, size), (0, 0, 0, 0))
draw = ImageDraw.Draw(img)

# Deep navy background with rounded corners (will be masked to circle)
bg_color = (10, 18, 36, 255)
accent = (0, 212, 255, 255)
accent_soft = (0, 212, 255, 60)
white = (232, 238, 247, 255)

# Draw rounded square background
corner = 14
draw.rounded_rectangle([2, 2, size-2, size-2], radius=corner, fill=bg_color)

# Outer glow ring
draw.rounded_rectangle([4, 4, size-4, size-4], radius=corner-2, outline=accent_soft, width=2)

# Shield shape (abstract)
w, h = size, size
shield_points = [
    (w*0.5, h*0.22),
    (w*0.72, h*0.32),
    (w*0.66, h*0.60),
    (w*0.50, h*0.74),
    (w*0.34, h*0.60),
    (w*0.28, h*0.32),
]
draw.polygon(shield_points, outline=accent, width=2)

# Inner hexagon / tech core
hex_r = 8
hex_points = []
import math
for i in range(6):
    angle = math.radians(60 * i - 30)
    hex_points.append((w*0.5 + hex_r * math.cos(angle), h*0.48 + hex_r * math.sin(angle)))
draw.polygon(hex_points, fill=accent)

# Save as PNG
img.save('/Users/houjiasanshao/WorkBuddy/favicon.png')
print('favicon.png generated')
