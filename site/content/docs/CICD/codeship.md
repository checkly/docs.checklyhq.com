---
title: Codeship
weight: 4
menu:
  docs:
    parent: "CI/CD integration"
---

The example below uses the Checkly [command line trigger](/docs/cicd/triggers/) feature to run checks from your Codeship project.

## Codeship example

If you are using Codeship, you can add an extra [custom deployment script](https://documentation.codeship.com/basic/continuous-deployment/deployment-with-custom-scripts/) after your existing deployment procedure:

```bash
echo 'Deployment finished.'
curl "https://api-test.checklyhq.com/check-groups/4/trigger/$CHECKLY_TOKEN" > $PWD/checkly.json
if [ $(grep -c '"hasFailures":true' $PWD/checkly.json) -ne 0 ]; then exit 1; fi
```

Additionally, you will need to set the `CHECKLY_TOKEN` environment variable from the `Environment` tab in your Codeship project settings:

![Codeship Checkly Token Setting](/docs/images/cicd/codeship-param.png)

_Note: the Checkly Token is the very last part of the check's command line trigger URL._

{{< info >}}
This is a v1 integration. We are working on providing better feedback, longer runs, GitHub PR feedback and more customization options
for checks triggered directly via the API. 
{{< /info >}}
 
 {{< warning >}}
 The total run time of all checks cannot exceed 30 seconds or you will receive a timeout error. 
 {{< /warning >}}
