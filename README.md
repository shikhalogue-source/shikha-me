# shikha-me

Portfolio website for **shikha**, creative director & brand designer.

Plain HTML/CSS/JS, no build step. Motion by [GSAP](https://gsap.com) (ScrollTrigger + SplitText) and [Lenis](https://lenis.darkroom.engineering) smooth scrolling, both vendored in `js/vendor/`.

## Run it locally

Any static server works. On a Mac with nothing installed:

```sh
cd "shikha-me (new website)"
ruby -run -e httpd . -p 8000
```

Then open http://localhost:8000.

## Edit the content

**Everything you'd want to change lives in [`js/content.js`](js/content.js)**: hero text, the three scroll statements, about, services, FAQ, email and social links, and all projects.

### Add a new project

1. Put the images in `assets/img/<project-name>/` (JPG, around 1800px wide) and any clips in `assets/video/`.
2. In `js/content.js`, copy one `{ slug: ..., title: ..., ... }` block inside `projects` and edit it.
3. Done. It appears on the home page and gets its own page at `work.html?p=<slug>`.

Case-study pages are built from `blocks`:

| type    | what it shows                                   |
|---------|-------------------------------------------------|
| `full`  | one full-width image (+ optional caption)        |
| `pair`  | two images side by side (`ratio: '1 / 1'` to crop)|
| `text`  | a heading with a large paragraph                 |
| `quote` | a big quote with a citation                      |
| `video` | a looping video with a sound toggle              |
| `reels` | four tall phone-shaped images/videos             |

The order of `projects` is the order on the site.

## Structure

```
index.html          home page
work.html           case-study template (reads ?p=<slug>)
css/style.css       all styles
js/content.js       all content  ← edit this
js/main.js          rendering + animation
js/gradient.js      WebGL hero gradient
assets/             images, videos, favicon, social preview (og.jpg)
```

## Deploy

Hosted on Vercel as a static site, with no framework and no build command. Pushing to `main` redeploys.
