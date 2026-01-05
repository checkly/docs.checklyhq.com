# ‼️ Documentation moved 🚨

> [!IMPORTANT]
> Checklys public documentation moved to [checkly/docs](https://github.com/checkly/docs?tab=readme-ov-file#checkly-docs).

## Run Locally

```bash
$ npm install
$ npm start
```

## Build & Deploy

```bash
$ npm run build
$ npm run deploy
```

> Push to any branch will generate deployment preview via Vercel

> Push to `main` will automatically deploy to production via Vercel

## Algolia Search

This is done automatically through a github action, see `.github/worksflows/algolia-docsearch.yml`.

## Docs, Learn & Guides

Docs, Learn & Guides sections are open to contributions. If you find a mistake, or you think that something could be improved, please open a PR 🙂

- Docs: `./site/content/docs`
- Learn: `./site/content/learn`
- Guides: `./site/content/guides`

## Markdown extensions

### Using images & videos

There are two places to store images:

1.`/site/static` for any images that are used in the UI, chrome, menus etc. These are typically icons, logos etc.
2.`/site/assets` for any images and videos (`.mp4`) that are used in the content of the site. These are typically screenshots, diagrams etc.

The `/site/assets` directory is special, as Hugo can use it to get "resources" which are then fed into the assets
processing pipeline, where they are optimized, transformed to `.webp` and some more magic.

Adding images to any markdown file works in the canonical way:

```markdown
![some alt text](/path/to/image.jpg "optional title")
```
The above markdown will trigger the `render-image.html` hook that does all the pipelining magic.

> Note that you can leave out the `/site/assets` part of the path.

For videos, you can use the same syntax, but with a `.mp4` file:

```markdown
![some alt text](/path/to/video.mp4 "optional title")
```

### Fancy fenced code blocks with title

You can make fancy fenced code blocks as follows. We recognize any typescript and javascript code blocks and
add a nice logo to them.

````markdown
```ts {title="src/index.ts"}
console.log('hello world')
```
````

You can also highlight certain lines in the code block by adding a `hl_lines` attribute to the code block.

````markdown
```ts {title="src/index.ts", hl_lines=[2]}
console.log('hello world')
console.log('this will be highlighted')
console.log('goodbey world')
``` 
````

### Alerts

We removed all the custom Hugo shortcodes and replaced them with markdown alerts. You can use the following types:

- `[!NOTE]` (default, same as not specifying any type) 
- `[!WARNING]`
- `[!CLI]`
````markdown
> This is a default note / info alert.

> [!NOTE]
> This is the same as the default note / info alert, just more explicit.

> [!WARNING]
> This is a warning.

> [!CLI]
> This adds a CLI tip!
````


## Blog

Do you want to share your use case and experience using Checkly with your product? Become a guest author. 
Reach us at [giovanni@checklyhq.com](mailto:giovanni@checklyhq.com)

## License

[MIT](https://github.com/checkly/jamstack-deploy/blob/master/LICENSE)
