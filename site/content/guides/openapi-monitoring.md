---
title: Automated OpenAPI/Swagger Testing
description: >-
  OpenAPI and Swagger help users design APIs and document them in a way that is both human and machine-readable. As a consequence, they can also be used to generate the code that will run the specified API. Can we leverage this same principle for API testing and monitoring?
author: Giovanni Rago
avatar: 'images/avatars/giovanni-rago.png'
---

## Swagger vs OpenAPI
TODO make explicit differntiation between 2.0 and 3.,0

What today is known as the [OpenAPI Specification (OAS)](https://spec.openapis.org/oas/v3.1.0) is based on the [Swagger Specification](https://swagger.io/specification/v2/), which was donated to the Linux Foundation in 2015. Nowadays, the OAS acts as a vendor-neutral standard for describing the structure and behaviour of HTTP-based web APIs.

The OAS specifies a standard, language-agnostic and machine-readable format to describe a web API in one or more files. Following it brings the following advantages:

1. A description of the API that is readable from both humans and machines.
2. The possibility of automatically generating documentation, implementation logic and even mock servers for testing - all from the basic API description.
3. Early validation of the data flows happening within the API.

The OAS exists as part of the [OpenAPI Initiative](https://www.openapis.org/).

## Exploring the specification

The core of our API specification will happen in the OpenAPI root document, normally named `openapi.json` or `openapi.yml`. We can choose between JSON and YAML formats as we like.

The bare minimum we need to declare is the OpenAPI version, the basic information about our API, and finally the available endpoints.

```yml
openapi: 3.0.0
info:
  title: OpenAPI document for our new Payment API
  version: 0.0.1
paths: {} # Nothing here yet
```

An API without endpoints is not very useful. We can add our first, together with a `GET` operation:

```yml
openapi: 3.0.0
info:
  title: OpenAPI document for our new Payment API
  version: 0.0.2
paths:
  # User account balance
  /balance/{id}:
    # Retrieve the user's balance on the given account
    get: 
      ...
```

The next step is to define what the operation will look like. In this case, we will specify some constraints on the `id` parameter, as well as the response.

```yml
openapi: 3.0.0
info:
  title: OpenAPI document for our new Payment API
  version: 0.0.3
paths:
  # User account balance
  /balance/{id}:
    # Retrieve the user's balance on the given account
    get: 
      summary: Get the user's account balance
      description: Retrieves the current account balance for the given user.
      operationId: get-balance
      parameters:
      - name: id
        in: path
        required: true
        schema:
          type: string
          format: uuid
      responses:
        "200":
          description: "OK"
          content:
            application/json:
              schema:
                $ref: "#/components/schemas/balance"
```

Notice we are explicitly defining which schemas the parameter and response should conform to. In the case of our response, we are referring to an [externally defined schema](https://swagger.io/docs/specification/using-ref/). This is helpful when we need to reuse a schema definition multiple times across our spec file.

As we proceed, we might add multiple endpoints, each with one or more operations.

```yml
openapi: 3.0.0
info:
  title: OpenAPI document for our new Payment API
  version: 0.0.4
paths:
  # User account balance
  /balance/{id}:
    # Retrieve the user's balance on the given account
    get:
      summary: Get the user's account balance
      ...
  /transactions:
    get:
      summary: Retrieve transaction
      ...
    post:
      summary: Submit transaction
      ...
  ...
```

We can keep on building out our API spec as needed. The more precisely we describe our API in this file, the more useful this specification will become, whether we use it for documentation or code generation purposes.

## Generating documentation from OpenAPI

Let's now take a look at a more complex, finished example: the [Swagger's PetStore demo](https://petstore.swagger.io/v2/swagger.json). Even if we had written it ourselves, this description of a complete API could be overwhelming if we just tried to parse the file line by line. To first-time users, that could feel even more daunting. A better option would be to use the open-source toolset Swagger offers to generate human-readable, interactive API documentation from the file we already have.

Pasting the content of the spec file to [Swagger Editor](https://editor.swagger.io/) will produce a preview of our [Swagger UI documentation](https://swagger.io/tools/swagger-ui/). This is helpful for consumers of the API, who will be presented with an orderly documentation page breaking down each endpoint while also allowing users to test out different operations.

## Generating boilerplate code from OpenAPI

When writing a new API, we will oftentimes need to produce a certain amount of boilerplate code for both our provider (e.g. a server exposing our API for consumption) and consumer (e.g. an SDK for our API) applications. Once we have our OpenAPI file in place, we can use [Swagger Codegen](https://swagger.io/tools/swagger-codegen/) (also available within Swagger Editor) to automatically generate that code for us, saving us precious time and reducing the avenues for human error.

```js
/**
   * Invokes the REST service using the supplied settings and parameters.
   * @param {String} path The base URL to invoke.
   * @param {String} httpMethod The HTTP method to use.
   * @param {Object.<String, String>} pathParams A map of path parameters and their values.
   * @param {Object.<String, Object>} queryParams A map of query parameters and their values.
   * @param {Object.<String, Object>} collectionQueryParams A map of collection query parameters and their values.
   * @param {Object.<String, Object>} headerParams A map of header parameters and their values.
   * @param {Object.<String, Object>} formParams A map of form parameters and their values.
   * @param {Object} bodyParam The value to pass as the request body.
   * @param {Array.<String>} authNames An array of authentication type names.
   * @param {Array.<String>} contentTypes An array of request MIME types.
   * @param {Array.<String>} accepts An array of acceptable response MIME types.
   * @param {(String|Array|ObjectFunction)} returnType The required type to return; can be a string for simple types or the
   * constructor for a complex type.
   * @param {module:ApiClient~callApiCallback} callback The callback function.
   * @returns {Object} The SuperAgent request object.
   */
  exports.prototype.callApi = function callApi(path, httpMethod, pathParams,
      queryParams, collectionQueryParams, headerParams, formParams, bodyParam, authNames, contentTypes, accepts,
      returnType, callback) {

    var _this = this;
    var url = this.buildUrl(path, pathParams);
    var request = superagent(httpMethod, url);

    // apply authentications
    this.applyAuthToRequest(request, authNames);

    // set collection query parameters
    for (var key in collectionQueryParams) {
      if (collectionQueryParams.hasOwnProperty(key)) {
        var param = collectionQueryParams[key];
        if (param.collectionFormat === 'csv') {
          // SuperAgent normally percent-encodes all reserved characters in a query parameter. However,
          // commas are used as delimiters for the 'csv' collectionFormat so they must not be encoded. We
          // must therefore construct and encode 'csv' collection query parameters manually.
          if (param.value != null) {
            var value = param.value.map(this.paramToString).map(encodeURIComponent).join(',');
            request.query(encodeURIComponent(key) + "=" + value);
          }
        } else {
          // All other collection query parameters should be treated as ordinary query parameters.
          queryParams[key] = this.buildCollectionParam(param.value, param.collectionFormat);
        }
      }
    }

    // set query parameters
    if (httpMethod.toUpperCase() === 'GET' && this.cache === false) {
        queryParams['_'] = new Date().getTime();
    }
    request.query(this.normalizeParams(queryParams));
```

TODO mock servers from responses, tests from def
TODO regen docs and API automatically from updated definition - lower maintenance effort

examples:
https://raw.githubusercontent.com/OAI/OpenAPI-Specification/master/examples/v3.0/petstore.json
https://petstore.swagger.io/v2/swagger.json

## Generated monitors with Checkly

- if you can generate APIs, you can also generate monitors for those APIs
- import in one button
- what is imported
-- name or URL
-- Import headers
-- Import query parameters
-- Import tags
Add aservice: swagger petstoretag to each check

body only if example is provided --> verify with another spec which has it

TODO: link api monitoring article
TODO: titles review
TODO: link getting started official guide https://oai.github.io/Documentation/specification.html
TODO explain what they do, link other tools at https://openapi.tools/

interesting keywords:
- openapi tutorial
- openapi generator