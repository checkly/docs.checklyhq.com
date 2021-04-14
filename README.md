# Checkly site

Develop

```bash
npm run start
```

Deploy

- push to any branch will deploy to preview via Vercel
- push to `master` will deploy to production via Vercel

## Updating search

This is done automatically through a github action, see `.github/worksflows/algolia-docsearch.yml`.

If you need to do it manually, go to the `algolia` directory and run the following.

```bash
pipenv shell
./docsearch run ./config.json
```
