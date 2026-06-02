"""
HD background removal for Vibe + Rapter client photos.

Quality decisions:
- Model: birefnet-general (best edge quality available in rembg, downloaded on
  first run). Markedly sharper outlines than isnet-general-use or u2net at the
  ~1.5MP source resolution we run at.
- post_process_mask=False — the default post-processing morphologically smooths
  the alpha edge, which reads as "blurry" on a card. Birefnet's raw mask is
  already clean.
- alpha_matting disabled — the trimap solver would push memory past the user's
  available RAM (the first attempt OOM'd at the 4th image).
- Per-image subprocess so the ONNX runtime + ~700MB weights are released
  between files.

Usage:
    python scripts/hd_cutouts.py                       # all 12 in subprocesses
    python scripts/hd_cutouts.py --one SRC DST         # single image, in-proc
"""
from __future__ import annotations
import sys
import subprocess
from pathlib import Path

ROOT = Path(r"e:/Electric-pe")
MODEL = "isnet-general-use"

JOBS = [
    ("Vibe.png",         "img/cutouts/vibe_brand_banner-cutout.png"),
    ("Raptor.png",       "img/cutouts/rapter_brand_banner-cutout.png"),

    ("Vibe blue.png",    "img/products/cutouts/vibe-1.png"),
    ("Vibe white.png",   "img/products/cutouts/vibe-2.png"),
    ("Vibe grey.png",    "img/products/cutouts/vibe-3.png"),
    ("Vibe Green.png",   "img/products/cutouts/vibe-4.png"),
    ("Vibe black.png",   "img/products/cutouts/vibe-5.png"),

    ("Raptor white.png", "img/products/cutouts/rapter-1.png"),
    ("Raptor red.png",   "img/products/cutouts/rapter-2.png"),
    ("Raptor green.png", "img/products/cutouts/rapter-3.png"),
    ("Raptor grey.png",  "img/products/cutouts/rapter-4.png"),
    ("Raptor black.png", "img/products/cutouts/rapter-5.png"),
]


def process_one(src_path: Path, dst_path: Path) -> None:
    import io
    from rembg import remove, new_session
    from PIL import Image

    dst_path.parent.mkdir(parents=True, exist_ok=True)
    session = new_session(MODEL)
    raw = src_path.read_bytes()
    cut = remove(raw, session=session, post_process_mask=False)
    img = Image.open(io.BytesIO(cut)).convert("RGBA")
    img.save(dst_path, format="PNG", optimize=True, compress_level=9)
    print(f"OK {src_path.name:24s} -> {dst_path.relative_to(ROOT)}  ({img.size[0]}x{img.size[1]})  {dst_path.stat().st_size // 1024} KB")


def main() -> None:
    if len(sys.argv) >= 4 and sys.argv[1] == "--one":
        process_one(Path(sys.argv[2]), Path(sys.argv[3]))
        return

    for src_name, dst_rel in JOBS:
        src = ROOT / src_name
        dst = ROOT / "public" / dst_rel
        res = subprocess.run(
            [sys.executable, __file__, "--one", str(src), str(dst)],
            cwd=str(ROOT),
        )
        if res.returncode != 0:
            print(f"FAIL {src_name} (exit {res.returncode})", file=sys.stderr)
            sys.exit(res.returncode)

    print("done.")


if __name__ == "__main__":
    main()
