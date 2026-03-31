#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="${ROOT_DIR}/../.env.local"
OUT_DIR="${ROOT_DIR}/public/images/generated"
MODEL_OPENROUTER="google/gemini-3-pro-image-preview"

if [[ -f "$ENV_FILE" ]]; then
  set -a
  source "$ENV_FILE"
  set +a
fi

mkdir -p "$OUT_DIR"

generate_openrouter() {
  local prompt="$1"
  local out="$2"

  if [[ -z "${OPENROUTER:-}" ]]; then
    return 1
  fi

  local tmp_json
  tmp_json="$(mktemp)"

  curl -s https://openrouter.ai/api/v1/chat/completions \
    -H "Authorization: Bearer ${OPENROUTER}" \
    -H "Content-Type: application/json" \
    -d "{\"model\":\"${MODEL_OPENROUTER}\",\"messages\":[{\"role\":\"user\",\"content\":\"${prompt}\"}],\"modalities\":[\"image\",\"text\"],\"image_config\":{\"aspect_ratio\":\"16:9\"},\"stream\":false}" \
    > "$tmp_json"

  local err
  err="$(jq -r '.error.message // empty' "$tmp_json")"
  if [[ -n "$err" ]]; then
    rm -f "$tmp_json"
    return 1
  fi

  local data_url
  data_url="$(jq -r '.choices[0].message.images[0].image_url.url // .choices[0].message.images[0].imageUrl.url // empty' "$tmp_json")"
  rm -f "$tmp_json"

  if [[ -z "$data_url" || "$data_url" != data:* ]]; then
    return 1
  fi

  printf '%s' "$data_url" | sed 's#^data:image/[^;]*;base64,##' | base64 --decode > "$out"
  file "$out" | rg -q "PNG image data|JPEG image data"
}

generate_hf() {
  local prompt="$1"
  local out="$2"

  if [[ -z "${HUGGINGFACE_TOKEN:-}" ]]; then
    return 1
  fi

  curl -s -X POST "https://router.huggingface.co/hf-inference/models/black-forest-labs/FLUX.1-schnell" \
    -H "Authorization: Bearer ${HUGGINGFACE_TOKEN}" \
    -H "Content-Type: application/json" \
    -d "{\"inputs\":\"${prompt}\",\"parameters\":{\"width\":1344,\"height\":768}}" \
    -o "$out"

  file "$out" | rg -q "JPEG image data"
}

generate_image() {
  local prompt="$1"
  local filename="$2"
  local out_path="$OUT_DIR/$filename"

  echo "-> generating $filename"
  if generate_openrouter "$prompt" "$out_path"; then
    echo "   OpenRouter OK"
    return 0
  fi

  if generate_hf "$prompt" "$out_path"; then
    echo "   HuggingFace fallback OK"
    return 0
  fi

  echo "   failed: $filename"
  return 1
}

generate_image "Premium photorealistic hero image for facilities management company in Sao Paulo, technicians inspecting HVAC system in modern commercial building, blue and amber accents, no text, no logo" "landing-hero-ai.jpg"
generate_image "Photorealistic maintenance specialists discussing operational plan inside corporate facility, modern Brazil context, no text" "about-team-ai.jpg"
generate_image "Photorealistic condominium maintenance scene with electrical and air conditioning service, no text" "segment-condominios-ai.jpg"
generate_image "Photorealistic corporate building operations center with facilities technicians and monitoring workflow, no text" "segment-corporativo-ai.jpg"
generate_image "Photorealistic industrial facility maintenance with PPE technicians inspecting critical equipment, no text" "segment-industrial-ai.jpg"
generate_image "Photorealistic digital quote workflow concept, owner selecting maintenance services on tablet and dashboard, no readable text" "quote-flow-ai.jpg"
generate_image "Photorealistic client portal access concept with laptop and smartphone in office desk, no text" "login-portal-ai.jpg"

echo "done: $OUT_DIR"
