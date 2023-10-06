# Algolia docsearch

The `config.json` needs to be invoked as per the docs on https://docsearch.algolia.com/docs/run-your-own
It will crawl our /docs pages and update the search index. We will automate this with a GitHub action.

## Running locally

You can update the Algolia index locally by running:

```bash
docker run -it --env-file=.env -e "CONFIG=$(cat config-docs.json | jq -r tostring)" algolia/docsearch-scraper
```

You need to provider an `.env` file with the following variables:

```bash
APPLICATION_ID=xxx
API_KEY=xxx
```
