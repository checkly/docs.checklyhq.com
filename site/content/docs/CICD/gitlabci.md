---
title: GitLab CI
weight: 7
menu:
  docs:
    parent: "CI/CD integration"
---

You can easily run your checks on demand as part of your GitLab CI pipelines using the Checkly [command line trigger](/docs/cicd/triggers/).

## GitLab CI example

To start off, you will need to set your `CHECKLY_TOKEN` as an [environment variable](https://docs.gitlab.com/ee/ci/variables/) for your pipeline. 

![GitLab Checkly Token Config](/docs/images/cicd/gitlab-param.png)

This secret value will allow you to use the Checkly trigger to start your check on demand. Having the value masked prevents it from showing up in your logs.

_Note: the Checkly Token is the very last part of the check's command line trigger URL._

The `.gitlab-ci.yml` file, which you can also find on our [checkly-ci-test GitHub repo](https://github.com/checkly/checkly-ci-test), is where you will define how your GitLab CI pipeline will look. We will be defining some basic placeholder steps, which you should rearrange to match your use case. Note the post-deployment `trigger_checkly` step to trigger Checkly checks and mark the build passed or failed depending on the outcome.

```yml
stages:
  - build
  - test
  - deploy
  - trigger_checkly

image: curlimages/curl

build:
  stage: build
  script:
    - echo "Building..."

test:
  stage: test
  script:
    - echo "Running tests..."

deploy:
  stage: deploy
  script:
    - echo "Deploying..."

run_checkly:
  stage: trigger_checkly
  script:
    - echo "Deployment finished."
    # Call Checkly trigger
    - curl "https://api-test.checklyhq.com/check-groups/4/trigger/$CHECKLY_TOKEN" > $PWD/checkly.json
    # Exit with an error status if we find more than 0 "hasFailures: true" in the output
    - if [ $(grep -c '"hasFailures":true' $PWD/checkly.json) -ne 0 ]; then exit 1; fi
```

{{< info >}}
This is a v1 integration. We are working on providing better feedback, longer runs, GitHub PR feedback and more customization options
for checks triggered directly via the API. 
{{< /info >}}
 
{{< warning >}}
The total run time of all checks cannot exceed 30 seconds or you will receive a timeout error. 
{{< /warning >}}