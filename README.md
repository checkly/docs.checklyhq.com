# checklyhq.com

> 🦝 Checkly public site & docs

## 🧑‍💻 Development

```bash
$ npm install
$ npm run serve
$ npm run lint
```

## 🚢 Build & Deploy

```bash
$ npm run build
$ npm run deploy
```

> Push to any branch will generate deployment preview via Vercel
> Push to `master` will automatically deploy to production via Vercel

## 🔎 Algolia Search

> This is done automatically through a github action, see `.github/worksflows/algolia-docsearch.yml`.

If you need to do it manually, run the following commands

```bash
$ cd algolia
$ ./docsearch run ./config.json
```
