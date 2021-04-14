---
title: HTTP request settings
weight: 2
menu:
  docs:
    parent: "API checks"
---

A full HTTP request is created by filling out the various parts of the HTTP request settings screen. Not all sections and fields
are mandatory, only a name and URL are required to get going.

While building up your API check, you can run the request and its assertions using the **Run request** button. This will run the
API checks on the production infrastructure and help you debug any issues.

## Method & URL

An API check starts with creating an HTTP request including a HTTP verb (GET, POST, PUT, etc.) and a URL at the minimum.

![api monitoring http request](/docs/images/api-checks/http-request-method.png)

- Available methods are `GET, POST, PUT, HEAD, DELETE, PATCH`
- URL's are checked for correctness and must start with either `http://` or `https://`

Checking the **"This request should fail"** box allows you to treat HTTP error codes (4xx and 5xx) as correct responses. This comes
in handy when testing 404 pages or 500 error handling.


## Body

Add body content to your request by formatting your content as text. Selecting the type of content will automatically set the correct `Content-Type` header for your request.

### JSON

This option sets the `Content-Type` request header to `application/json`. Format your input as standard JSON, i.e:

```js
{
  "key1": "val2",
  "key2": {
    "nestedKey1": "val2"
  }
}
```
JSON bodies are commonly used with REST APIs.

### GraphQL


This option also sets the `Content-Type` request header to `application/json`, but allows you to type GraphQL queries and
format them as such, i.e.

```graphql
query {
  allUsers {
    posts {
      id
    }
  }
}
```

### FORM

This option sets `Content-Type` request header to `application/x-www-form-urlencoded`. Format your input as a string of key/value pairs concatenated with ampersands, i.e:

```bash
key1=value1&key2=value2
```
Form encodes bodies are commonly used "traditional" HTML form submissions.

### RAW

Use this input if neither JSON nor form parameters work for you. No `Content-Type` request header is set. You can set this header explicitly in the "headers" section.

## Headers

Add HTTP request headers. The type ahead feature is pre-populated with the most common headers, but you can add any custom headers you want.

![api monitoring HTTP headers](/docs/images/api-checks/headers-query.png)

Clicking the **lock icon** toggles between encrypting the value of the header on the Checkly backend and hiding it from your screen.

## Query parameters

This section allows you to add query parameters to the request URL in a structured way. You can add as many query parameters as you want. The interface is the same as for the HTTP headers: you can use the lock icon to toggle encryption and screen hiding.

> You can also just leave the query parameters as part of the URL. Whatever works for you.

## Basic authentication

To add [HTTP basic authentication parameters](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication) to your API
request, use the username and password fields in the relevant section.

![api monitoring basic auth](/docs/images/api-checks/basic-auth.png)

## Import a cURL request

You can import the request method, url, headers and body from a [cURL](https://curl.haxx.se/) command.
Arguments `--user-agent`, `--cookie` and `--compressed` also work.

## Import a Swagger / OpenAPI specification

If your API implements the Swagger 2.0 or OpenAPI spec, you can import the `swagger.json` spec. The importer
parses your spec and prompts you to make some decisions about which requests are to be imported and how.

![api import Swagger](/docs/images/api-checks/swagger.png)

- **Name:** you can set the check name to the "description" or "url" from your spec.
- **Tags:** import tags from you spec.
- **Headers:** import HTTP headers from you spec.
- **Query parameters:** import query parameters from your spec.
- **Add a "group" tag:** Copy the name of you spec to a tag and add it to each imported request. This helps
filtering and grouping related checks in the Checkly dashboard.

## Responses

In almost all cases, you have full access to the HTTP response for assertions. We also store the full response
for later retrieval and triaging issues.

However, if your API responds with a binary type body, i.e. a PDF or video file, we scrub the body and replace
it with a short text saying that we scrubbed it. We determine the body content type by looking at the `Content-Type`
response header. 

This list shows all content types that we scrub from the response data.

| content type |
| ------------- |
|`application/pdf`|
|`audio/wave`|
|`audio/wav`|
|`audio/x-wav`|
|`audio/x-pn-wav`|
|`audio/mpeg`|
|`audio/x-ms-wma`|
|`audio/vnd.rn-realaudio`|
|`application/octet-stream`|
|`application/ogg`|
|`application/x-shockwave-flash`|
|`application/zip`|
|`video/mpeg`|
|`video/mp4`|
|`video/quicktime`|
|`video/x-ms-wmv`|
|`video/x-msvideo`|
|`video/x-flv`|
|`video/webm`|

