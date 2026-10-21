# Vincent Chen's portfolio

The site runs directly on GitHub Pages. No build or package installation is needed.

## Edit page content

Edit these Markdown files, then commit and push as usual:

| Page / section | Content file |
| --- | --- |
| Home introduction | `content/home/hero.md` |
| Featured projects | `content/home/projects.md` |
| Technical skills | `content/home/skills.md` |
| About me | `content/home/about.md` |
| Contact | `content/home/contact.md` |
| Unity game description | `content/game.md` |

Use normal Markdown: `# Heading`, `## Section`, `**bold**`, `- list item`,
`[link](URL)`, and `![description](image-path)`. Project entries are a list
with an image and a level-three heading; keep that structure for the card grid.
The home introduction's final paragraph contains the action links.

Paths in Markdown are relative to the **HTML page**, not the Markdown file.
For example, home images use `assets/images/games/sin-no-hate.jpg`; a link
from the game page to home uses `../../index.html`.

The header, navigation, footer, and Unity player remain in HTML. Styling lives
in the HTML template and `assets/markdown.css`. Markdown content supports
sanitized HTML when you need extra formatting.

## Add another page

Create a Markdown file and an HTML page with the following body container
and scripts (adjust paths for nested pages):

```html
<link rel="stylesheet" href="assets/markdown.css">
<main data-markdown="content/my-page.md" aria-busy="true">
  <p role="status">Loading content…</p>
</main>
<noscript>Enable JavaScript to read this page.</noscript>
<script defer src="assets/vendor/marked/marked.umd.js"></script>
<script defer src="assets/vendor/dompurify/purify.min.js"></script>
<script defer src="assets/js/markdown.js"></script>
```

You can also add several `data-markdown` containers to a page to keep its
sections in separate files. Failed loads show a message instead of staying
on the loading indicator. Content rendering requires JavaScript.

## Local development

From the repository root:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

Open the site through this HTTP server; opening HTML via `file://` will not
allow Markdown fetching. Refresh after editing content.

## Libraries

Vendored browser distributions: Marked 18.1.1 and DOMPurify 3.4.17.
Their licenses are in `assets/vendor/`. These local files avoid a runtime CDN
dependency. DOMPurify sanitizes the HTML produced by Marked before insertion.

## Game detail pages

Each featured project's image and title link to its own minimal detail page.
Edit the matching Markdown file to fill it in:

| Game | Content file | Page |
| --- | --- | --- |
| Sin no hate | `content/games/sin-no-hate.md` | `Games/sin-no-hate/` |
| Bousou Kart | `content/games/bousou-kart.md` | `Games/bousou-kart/` |
| Psychic Showdown | `content/games/psychic-showdown.md` | `Games/psychic-showdown/` |
| Tank Tank Tank | `content/games/tank-tank-tank.md` | `Games/tank-tank-tank/` |
| Reikai Revenge | `content/games/reikai-revenge.md` | `Games/reikai-revenge/` |
| Kotodama Chronicle | `content/games/kotodama-chronicle.md` | `Games/kotodama-chronicle/` |

These pages start with just the game title and “Details coming soon.” A shared
stylesheet at `assets/game-page.css` matches the portfolio's colors. Markdown
links and images on these pages need paths relative to `Games/<game>/`; for
example, `../../assets/images/games/sin-no-hate.jpg`.
