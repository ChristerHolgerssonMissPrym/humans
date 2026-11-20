# MISSPRYM.md

Miss Prym's site rebuilt in the visual language of [human-md.ai](https://human-md.ai): a scroll-driven "manifesto file" with a HUD, a card index, a reading mode and a downloadable `.md` file.

The content comes from [missprym.com](https://www.missprym.com) and [missprym.tech](https://missprym.tech).

## Files

- `index.html` – the page skeleton (HUD, index, file window)
- `content.js` – **all text**. Edit here; the scenes, index, reading mode and `MISSPRYM.md` are generated from it
- `app.js` – rendering and scroll animation (vanilla JS, no build step)
- `styles.css` – the design (Bricolage Grotesque, Instrument Serif, Cutive Mono; ink/paper/accent palette)

The illustrations are loaded from `missprym.com/images/`. The fonts are loaded from Google Fonts.

## Run locally

Open `index.html` directly, or run:

```sh
python3 -m http.server 8000
```

## Publish

Under GitHub → Settings → Pages, choose "Deploy from a branch" → `main` / root.
