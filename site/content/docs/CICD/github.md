---
title: GitHub deployments
weight: 2
menu:
  docs:
    parent: "CI/CD integration"
---

GitHub deployments are webhook events triggered by GitHub whenever a deployment service reports a successful deployment 
event. This works out-of-the-box with the following services. 

- [Vercel for GitHub](https://vercel.com/docs/v2/git-integrations/vercel-for-github)
- [Heroku Pipelines](https://devcenter.heroku.com/articles/pipelines)

Any (SaaS) service that interacts with the [GitHub deployments API](https://developer.github.com/v3/repos/deployments/) and
reports the correct "success" message will work.

## Setting up your GitHub integration

1. Go to the **integrations tab** in your account settings and click the "Integrate with GitHub" button.    
![set up GitHub integration step 1](/docs/images/cicd/github_setup_1.png)

2. You will be redirected to GitHub and prompted to select an account and install the Checkly GitHub App.  
![set up GitHub integration step 2](/docs/images/cicd/github_setup_2.png)

3. When accepting the installation, you are redirected back to Checkly and the integration is installed. 
Now, go to the **CI/CD tab** of the check you want to link to a GitHub repository.    
![set up GitHub integration step 3](/docs/images/cicd/github_setup_3.png)

4. Click the **"Link GitHub repo"** button and select the repository you want to link.  
![set up GitHub integration step 4](/docs/images/cicd/github_setup_4.png)

5. On each deployment event, we will run your check and report the results directly in **your GitHub timeline and PR overview**.  
![set up GitHub integration step 5](/docs/images/cicd/github_setup_5.png)

6. You will also get an overview of the check result in the *details* section
![set up GitHub integration step 6](/docs/images/cicd/github_setup_6.png)


{{<info >}}
You can hook up multiple checks to the same repo. We will just run all of them as a test suite.
{{</info>}}

## Using environment URLs

GitHub reports an **environment URL** on each deployment event. Depending on what deployment service you use,
this environment URL can be used to run your check on different target environments than configured in your check.  

The primary use case for this is validating temporary review/branch deployments, such as those provided by Vercel 
and Heroku Pipelines, before going to production. 

So, when you enable the **"Use environment URL from deployment trigger"** checkbox there are two scenarios:

### API checks & environment URLs 

With API checks, we replace the hostname part of your request url with the host in the environment URL. 
For example:

- Your configured URL: `https://api.acme.com/v1/customers?page=1`
- Environment URL: `https://now.customer-api.qis6va2z7.now.sh`
- Replaced URL: `https://now.customer-api.qis6va2z7.now.sh/v1/customers?page=1`

Notice we only replace the **host** part, not the URL path or any query parameters.

### Browser checks & environment URLs

For browser checks, the environment URL is exposed as the `ENVIRONMENT_URL` environment variable. This means you can use that
variable in your code to replace any hardcoded URL you might have, i.e.:

{{< tabs "Environment example" >}}
{{< tab "Puppeteer" >}}
```js
const puppeteer = require('puppeteer')
const browser = await puppeteer.launch()
const page = await browser.newPage()

const myURL = process.env.ENVIRONMENT_URL || 'https://acme.com'
await page.goto(myURL)

await browser.close()
 ```
{{< /tab >}}
{{< tab "Playwright" >}}
```js
const playwright = require('playwright')
const browser = await playwright.chromium.launch()
const page = await browser.newPage()

const myURL = process.env.ENVIRONMENT_URL || 'https://acme.com'
await page.goto(myURL)

await browser.close()
 ```
{{< /tab >}}
{{< /tabs >}}





