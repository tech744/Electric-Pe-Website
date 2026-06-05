"""
HD background removal for the new Sniper Duo client photos.

Same memory-frugal pattern as scripts/hd_cutouts.py — one subprocess per
image so the ONNX runtime is released between files. Uses isnet-general-use
(already cached) with no post_process_mask, so edges stay sharp instead of
getting morphologically smoothed.
"""
from __future__ import annotations
import sys
import subprocess
from pathlib import Path

ROOT = Path(r"e:/Electric-pe")
MODEL = "isnet-general-use"

JOBS = [
    # Brand banner — Red is the hero shot for Sniper Duo.
    ("Sniper Duo Red.png",   "img/cutouts/sniper-duo_brand_banner-cutout.png"),

    # Color variants: 1=Red, 2=Black, 3=Blue, 4=Grey, 5=White, 6=Green
    ("Sniper Duo Red.png",   "img/products/cutouts/sniper-duo-1.png"),
    ("Sniper Duo Black.png", "img/products/cutouts/sniper-duo-2.png"),
    ("Sniper Duo Blue.png",  "img/products/cutouts/sniper-duo-3.png"),
    ("Sniper Duo Grey.png",  "img/products/cutouts/sniper-duo-4.png"),
    ("Sniper Duo White.png", "img/products/cutouts/sniper-duo-5.png"),
    ("Sniper Duo Green.png", "img/products/cutouts/sniper-duo-6.png"),
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
