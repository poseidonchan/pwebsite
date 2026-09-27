#!/usr/bin/env bash
set -euo pipefail

cv_dir="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
site_dir="$(dirname -- "$cv_dir")"
build_dir="$(mktemp -d "${TMPDIR:-/tmp}/yanshuo-cv.XXXXXX")"
trap 'rm -rf -- "$build_dir"' EXIT

cd "$cv_dir"
latexmk -xelatex -interaction=nonstopmode -halt-on-error \
  -outdir="$build_dir" -jobname=yanshuo-chen-cv-public resume.tex

mkdir -p "$site_dir/output/pdf" "$site_dir/assets"
cp "$build_dir/yanshuo-chen-cv-public.pdf" "$site_dir/output/pdf/yanshuo-chen-cv-public.pdf"
cp "$build_dir/yanshuo-chen-cv-public.pdf" "$site_dir/assets/yanshuo-chen-cv-public.pdf"
