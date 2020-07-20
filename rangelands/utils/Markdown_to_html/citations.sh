#!/bin/bash

CSL=civil.csl

cat src/biblio.bib | \
  grep '^\s*@' | \
  sed -e 's/ *@[^{]*{\([^,]*\),/1. [@\1]/g' > build/citations.md

echo '\clearpage' >> build/citations.md

cat build/citations.md | pandoc -f markdown -t latex \
  --reference-links \
  --standalone \
  --bibliography=src/biblio.bib \
  --csl templates/$CSL \
  -o build/citations.pdf

open build/citations.pdf
