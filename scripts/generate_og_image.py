#!/usr/bin/env python3
"""Generate og-image.png for Twitter/OG cards with proper Chinese font rendering."""

from PIL import Image, ImageDraw, ImageFont
import math

W, H = 1200, 630
OUTPUT = "docs/public/og-image.png"

# ── Fonts ──────────────────────────────────────────────
font_path = "/System/Library/Fonts/Hiragino Sans GB.ttc"
def load_font(size, weight="W6"):
    """W6=Bold, W3=Regular"""
    return ImageFont.truetype(font_path, size)

font_url    = load_font(24, "W3")
font_title  = load_font(68, "W6")
font_sub    = load_font(40, "W3")
font_tag    = load_font(28, "W3")
font_code   = load_font(22, "W3")

# ── Create image ───────────────────────────────────────
img = Image.new("RGB", (W, H))
draw = ImageDraw.Draw(img)

# ── Background gradient ────────────────────────────────
# Top: RGB(30, 20, 80), Bottom: RGB(60, 25, 110)
for y in range(H):
    t = y / H
    r = int(30 + 35 * t)
    g = int(20 + 8 * t)
    b = int(80 + 35 * t)
    draw.line([(0, y), (W, y)], fill=(r, g, b))

# ── Subtle decorative elements ─────────────────────────
# Large soft circle top-right
cx, cy, cr = 900, 150, 300
for y in range(max(0, cy - cr), min(H, cy + cr)):
    for x in range(max(0, cx - cr), min(W, cx + cr)):
        dx, dy = x - cx, y - cy
        dist = math.sqrt(dx * dx + dy * dy)
        if dist < cr:
            alpha = max(0, 1 - dist / cr) * 0.06
            r0, g0, b0 = img.getpixel((x, y))
            r_new = int(r0 * (1 - alpha) + 180 * alpha)
            g_new = int(g0 * (1 - alpha) + 150 * alpha)
            b_new = int(b0 * (1 - alpha) + 255 * alpha)
            draw.point((x, y), fill=(r_new, g_new, b_new))

# Small glow bottom-left
cx2, cy2, cr2 = 150, 550, 200
for y in range(max(0, cy2 - cr2), min(H, cy2 + cr2)):
    for x in range(max(0, cx2 - cr2), min(W, cx2 + cr2)):
        dx, dy = x - cx2, y - cy2
        dist = math.sqrt(dx * dx + dy * dy)
        if dist < cr2:
            alpha = max(0, 1 - dist / cr2) * 0.08
            r0, g0, b0 = img.getpixel((x, y))
            r_new = int(r0 * (1 - alpha) + 100 * alpha)
            g_new = int(g0 * (1 - alpha) + 80 * alpha)
            b_new = int(b0 * (1 - alpha) + 200 * alpha)
            draw.point((x, y), fill=(r_new, g_new, b_new))

# ── URL top-left ───────────────────────────────────────
draw.text((60, 45), "https://doc.869hr.uk", fill=(180, 180, 210), font=font_url)

# ── Main title ─────────────────────────────────────────
# Gradient text: light blue to white
title_y = 160
draw.text((60, title_y), "超过100T的资源", fill=(220, 225, 255), font=font_title)

# ── Subtitle ───────────────────────────────────────────
draw.text((60, title_y + 90), "大坝的资源收集站", fill=(180, 195, 235), font=font_sub)

# ── Tagline / description ──────────────────────────────
draw.text((60, title_y + 145), "免费资源下载", fill=(150, 165, 210), font=font_tag)

# ── Feature bullets ────────────────────────────────────
features = [
    "AI 知识 · 书籍资料",
    "跨境电商 · 自媒体",
    "教育 · 健康 · 影视 · 工具",
]
bullet_y = title_y + 200
for i, feat in enumerate(features):
    draw.text((60, bullet_y + i * 38), feat, fill=(140, 155, 200), font=font_tag)

# ── Right side: Browser mockup ─────────────────────────
panel_x, panel_y = 620, 130
panel_w, panel_h = 520, 420

# Shadow
shadow_off = 6
draw.rounded_rectangle(
    [(panel_x + shadow_off, panel_y + shadow_off),
     (panel_x + panel_w + shadow_off, panel_y + panel_h + shadow_off)],
    radius=16, fill=(15, 10, 45)
)

# Panel body
draw.rounded_rectangle(
    [(panel_x, panel_y), (panel_x + panel_w, panel_y + panel_h)],
    radius=16, fill=(25, 22, 55)
)

# Header bar
header_h = 44
draw.rounded_rectangle(
    [(panel_x + 2, panel_y + 2), (panel_x + panel_w - 2, panel_y + header_h)],
    radius=12, fill=(40, 38, 70)
)

# Browser dots
dot_colors = [(255, 95, 87), (255, 189, 46), (39, 201, 63)]
for i, color in enumerate(dot_colors):
    dx = panel_x + 16 + i * 20
    dy = panel_y + header_h // 2
    draw.ellipse([(dx - 5, dy - 5), (dx + 5, dy + 5)], fill=color)

# URL bar
url_bar_x = panel_x + 80
url_bar_w = panel_w - 100
url_bar_h = 24
draw.rounded_rectangle(
    [(url_bar_x, panel_y + 10), (url_bar_x + url_bar_w, panel_y + 10 + url_bar_h)],
    radius=6, fill=(55, 52, 85)
)
draw.text((url_bar_x + 12, panel_y + 13), "https://doc.869hr.uk", fill=(140, 140, 160), font=font_code)

# Content area - simulated text lines
content_x = panel_x + 24
content_y = panel_y + header_h + 24
line_w_full = panel_w - 48
line_colors = [
    (80, 78, 110),  # heading line
    (65, 63, 90),   # body lines
    (65, 63, 90),
    (65, 63, 90),
    (65, 63, 90),
    (65, 63, 90),
    (55, 53, 80),   # lighter
    (55, 53, 80),
    (55, 53, 80),
]

# A heading-like block
draw.rounded_rectangle(
    [(content_x, content_y), (content_x + 180, content_y + 14)],
    radius=7, fill=(120, 110, 180)
)

# Body lines
line_start_y = content_y + 36
line_data = [
    (0, 0.95), (0, 0.85), (0, 0.72), (0, 0.90),
    (0, 0.55), (0, 0.80), (0, 0.65), (0, 0.75),
]
for i, (offset, ratio) in enumerate(line_data):
    ly = line_start_y + i * 28
    lw = int(line_w_full * ratio)
    color_idx = min(i, len(line_colors) - 1)
    draw.rounded_rectangle(
        [(content_x + offset, ly), (content_x + offset + lw, ly + 10)],
        radius=5, fill=line_colors[color_idx]
    )

# A card/code block
card_y = line_start_y + len(line_data) * 28 + 16
card_h = 100
draw.rounded_rectangle(
    [(content_x, card_y), (content_x + line_w_full, card_y + card_h)],
    radius=8, fill=(18, 16, 40)
)
# Code lines inside card
for i in range(4):
    cl_y = card_y + 16 + i * 20
    cl_w = [160, 220, 140, 200][i]
    cl_color = [
        (100, 180, 255),
        (180, 140, 220),
        (100, 200, 160),
        (220, 180, 120),
    ][i]
    draw.rounded_rectangle(
        [(content_x + 16, cl_y), (content_x + 16 + cl_w, cl_y + 8)],
        radius=4, fill=cl_color
    )

# ── Save ───────────────────────────────────────────────
img.save(OUTPUT, "PNG", optimize=True)
print(f"Saved: {OUTPUT} ({W}x{H})")
