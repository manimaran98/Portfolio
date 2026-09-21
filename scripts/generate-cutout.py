"""
Regenerate public/Profile-cutout.png from public/Profile.jpg.

One deterministic pass: knock out the white studio background, erode the matte
to kill the white fringe, crop to the subject, then upscale 2x so retina gets a
real variant instead of a browser stretch. Re-runnable — the source JPEG is
never modified.
"""
from collections import deque
import numpy as np
from PIL import Image, ImageFilter
import os

SRC, DST = 'public/Profile.jpg', 'public/Profile-cutout.png'

img = Image.open(SRC).convert('RGB')
w, h = img.size
a = np.asarray(img).astype(np.int16)
mn, sat = a.min(axis=2), a.max(axis=2) - a.min(axis=2)
bg_like = (mn >= 215) & (sat <= 26)

# Flood fill inward from the border so white ON the subject is never removed.
visited = np.zeros((h, w), dtype=bool)
q = deque()
for x in range(w):
    for y in (0, h - 1):
        if bg_like[y, x] and not visited[y, x]:
            visited[y, x] = True; q.append((y, x))
for y in range(h):
    for x in (0, w - 1):
        if bg_like[y, x] and not visited[y, x]:
            visited[y, x] = True; q.append((y, x))
while q:
    y, x = q.popleft()
    for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
        ny, nx = y + dy, x + dx
        if 0 <= ny < h and 0 <= nx < w and not visited[ny, nx] and bg_like[ny, nx]:
            visited[ny, nx] = True; q.append((ny, nx))

alpha = Image.fromarray(np.where(visited, 0, 255).astype(np.uint8), mode='L')
alpha = alpha.filter(ImageFilter.MinFilter(3))        # erode ~1px: kills the halo
alpha = alpha.filter(ImageFilter.GaussianBlur(0.7))   # re-soften the matte edge

af = np.asarray(alpha).astype(np.float32) / 255.0
rgb = np.asarray(img).astype(np.float32)
edge = (af > 0.03) & (af < 0.97)
rgb[edge] *= 0.8                                      # darken any surviving rim

out = Image.fromarray(
    np.dstack([np.clip(rgb, 0, 255).astype(np.uint8), np.asarray(alpha)]), 'RGBA'
)

ys, xs = np.where(np.asarray(alpha) > 12)
pad = 6
out = out.crop((max(0, xs.min() - pad), max(0, ys.min() - pad),
                min(w, xs.max() + 1 + pad), min(h, ys.max() + 1 + pad)))
cw, ch = out.size

# 2x Lanczos, then unsharp to restore the edge definition resampling softens.
up = out.resize((cw * 2, ch * 2), Image.LANCZOS)
sharp = up.convert('RGB').filter(ImageFilter.UnsharpMask(radius=1.3, percent=62, threshold=3))
final = sharp.convert('RGBA')
final.putalpha(up.getchannel('A'))
final.save(DST, optimize=True)

print(f'cropped {cw}x{ch} -> output {final.size[0]}x{final.size[1]}'
      f'  aspect {cw/ch:.4f}  {os.path.getsize(DST)//1024} KB')
print(f'Hero.jsx should use: aspect-[{cw}/{ch}]  width={{{final.size[0]}}}  height={{{final.size[1]}}}')
