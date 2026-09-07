# ruizTechServices favicon

Replaces the starter Vercel triangle with a lowercase `r` and typing caret on cobalt. The compact mark echoes the public `ruizTechServices|` wordmark without trying to fit the entire name into a browser tab. White and pale cyan provide contrast against the opaque blue tile.

## Assets

- `public/brand/rts-mark-source.png`: selected full-resolution master.
- `app/favicon.ico`: embedded 16, 32, and 48 pixel browser icons.
- `app/icon.png`: 512 pixel, palette-optimized modern icon.
- `app/apple-icon.png`: opaque 180 pixel Apple touch icon.

Next.js discovers these files and emits the icon links. Do not add duplicate manual `metadata.icons` or a second `public/favicon.ico`. The generated `icon.png` URL includes a content version, helping browsers pick up the replacement.

## Design provenance

Created with the built-in image-generation tool on September 7, 2026. The first render was rejected because of missing background and rough edges. The final refinement prompt was:

> Finalize this logo for production. Keep the exact lowercase r plus vertical caret concept, but fix the failed background and edges. REQUIRED: completely opaque cobalt royal blue #174BEA background covering every pixel of the square, not black, not transparent, no alpha channel cutout. The square blue background is an essential part of the mark and must NOT be removed. Clean the white r contour into one perfectly smooth solid geometric silhouette, with no speckles, no eroded edges, no fragments, no outlines. Clean the pale icy cyan caret into one solid straight rectangle. No gradient on the mark, no shadow, no texture. Enlarge the r| group to occupy 64% of the canvas width and about 64% height while centered with equal generous margins. Flat crisp vector-like graphic. One finished square blue image, no mockup. This is a complete opaque blue graphic with light lettering. Preserve the lowercase r identity; do not use a capital R.

The saved master is authoritative; generation prompts are design intent, not pixel specifications. ImageMagick performs only delivery resizing, PNG palette optimization, and ICO packaging.

## Re-export

From the repository root with ImageMagick installed:

```bash
convert public/brand/rts-mark-source.png -filter Lanczos -resize 512x512 -dither None -colors 32 -strip PNG8:app/icon.png
convert public/brand/rts-mark-source.png -filter Lanczos -resize 180x180 -dither None -colors 32 -strip PNG8:app/apple-icon.png
convert public/brand/rts-mark-source.png -filter Lanczos -define icon:auto-resize=48,32,16 app/favicon.ico
identify app/favicon.ico app/icon.png app/apple-icon.png
npm run build
```

Use the existing configured application environment for a full build. Check generated HTML for favicon, icon, and apple-touch-icon links, and inspect the actual 16 pixel icon as well as the larger artwork. No database, auth, or runtime component changes are required.

Reference: [Next.js 15 icon file conventions](https://nextjs.org/docs/15/app/api-reference/file-conventions/metadata/app-icons).
