# Personal website

Published at <https://chenyanshuo.com/> through GitHub Pages, using the root of
the `main` branch. `CNAME` preserves the custom domain. The site is plain HTML,
CSS, and JavaScript; `.nojekyll` disables Jekyll processing.

`index.html` is the homepage. Public pages include canonical URLs and are listed
in `sitemap.xml`; `robots.txt` points search engines to that sitemap.

`blog.html` is the blog index;
articles live in `blog/` and share `css/blog.css`. The homepage links to the
index and the latest article, with related updates in News.
The original analysis linked from `blog/who-owns-intelligence.html` is retained
unchanged in `assets/who-owns-intelligence-en-v18.pdf`.

Preview locally from this directory:

```sh
conda run --no-capture-output -n base python -m http.server 8765 --bind 127.0.0.1
```

Open <http://127.0.0.1:8765/>. No build step or package installation is needed.

Homepage styles live in `css/proposal.css`. `js/proposal.js` adds publication
filters and section navigation; all publications remain available without JavaScript.

The public CV is `assets/yanshuo-chen-cv-public.pdf`. It omits Education and Research
Experience, keeping general interests, employment, honors, and public papers. Editable source lives in
`cv-public/`; run `bash cv-public/build.sh` to rebuild it. Never publish private
research plans or unpublished project descriptions.

Push reviewed changes to `main` to publish. Confirm the GitHub Pages deployment
completes, then check the homepage and Blog at the custom domain. Local
drafts, duplicate previews, and generated review outputs are excluded from Git.
