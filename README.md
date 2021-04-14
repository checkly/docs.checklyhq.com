<p align="center">
  <img width="400px" src="./src/assets/images/text_racoon_logo.svg" alt="Checkly" />
</p>


> 🦝 Checkly public site & docs

## 🧑‍💻 Development

```bash
$ npm install
$ npm start

$ npm run start:api
```

## 🚢 Build & Deploy

```bash
$ npm run build
$ npm run deploy
```


> Push to any branch will generate deployment preview via Vercel

> Push to `master` will automatically deploy to production via Vercel

## 🔎 Algolia Search

This is done automatically through a github action, see `.github/worksflows/algolia-docsearch.yml`.
If you need to do it manually, run the following commands

```bash
$ cd algolia
$ ./docsearch run ./config.json
```

## 💪 Docs, Learn & Guides

Docs, Learn & Guides sections are open to contributions. If you find a mistake or you think that something could be improve, please open a PR 🙂

- Docs: `./site/content/docs`
- Learn: `./site/content/learn`
- Guides: `./site/content/guides`


## 🗞 Blog

Do you want to share your use case and experience using Checkly with your product? Became a guest author. Reach us at [gio@checklqhq.com](mailto:gio@checklyhq.com)


## 📄 License

[MIT](https://github.com/checkly/jamstack-deploy/blob/master/LICENSE)