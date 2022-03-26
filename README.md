<p>
  <img height="128" src="https://www.checklyhq.com/images/footer-logo.svg" align="right" />
  <h1>checklyhq.com</h1>
</p>

> 🦝 Checkly public site, docs and guides

<img width="1676" alt="hero" src="https://user-images.githubusercontent.com/3258966/126023413-a69448d5-00ec-4161-aad6-99047b0aea97.png">


## Run Locally

```bash
$ npm install
$ npm start

$ npm run start:api
```

## Build & Deploy

```bash
$ npm run build
$ npm run deploy
```

> Push to any branch will generate deployment preview via Vercel

> Push to `master` will automatically deploy to production via Vercel

## Algolia Search

This is done automatically through a github action, see `.github/worksflows/algolia-docsearch.yml`.
If you need to do it manually, run the following commands

```bash
$ cd algolia
$ ./docsearch run ./config.json
```

## Docs, Learn & Guides

Docs, Learn & Guides sections are open to contributions. If you find a mistake or you think that something could be improve, please open a PR 🙂

- Docs: `./site/content/docs`
- Learn: `./site/content/learn`
- Guides: `./site/content/guides`

## Blog

Do you want to share your use case and experience using Checkly with your product? Become a guest author. Reach us at [giovanni@checklyhq.com](mailto:giovanni@checklyhq.com)

## License

[MIT](https://github.com/checkly/jamstack-deploy/blob/master/LICENSE)

<br>

<p align="center">
  <a href="https://checklyhq.com?utm_source=github&utm_medium=sponsor-logo-github&utm_campaign=headless-recorder" target="_blank">
  <img width="100px" src="https://www.checklyhq.com/images/text_racoon_logo.svg" alt="Checkly" />
  </a>
  <br />
  <i><sub>Delightful Active Monitoring for Developers</sub></i>
  <br>
  <b><sub>From Checkly with ♥️</sub></b>
<p>
