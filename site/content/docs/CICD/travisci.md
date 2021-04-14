---
title: Travis CI
weight: 6
menu:
  docs:
    parent: "CI/CD integration"
---

You can trigger your checks from your Travis CI builds. Below is an example of a `.travis.yml` that uses the 
Checkly [command line trigger](/docs/cicd/triggers/) feature to run checks from any CI/CD solution.

## Travis CI example

This `.travis.yml` file is from our [checkly-ci-test GitHub repo](https://github.com/checkly/checkly-ci-test).  This file 
goes through the following phases:

1. Install dependencies
2. Run unit tests
3. Deploy to an environment
4. Run Checkly checks 

The install, unit test, build and deployment phases are of course highly specific to your stack and environment. 

```yaml
# The language, build and unit test phases are just examples from our example repo
language: node_js
node_js:
  - 10
cache:
  directories:
    - node_modules    
script:
  - npm run test:unit
  - npm run build  
before_deploy: "echo 'Deploying.'"
deploy:
  provider: s3
  access_key_id: $AWS_ACCESS_KEY_ID
  secret_access_key: $AWS_SECRET_ACCESS_KEY
  bucket: checkly-ci-test
  skip_cleanup: true
  local_dir: dist 

# The interesting part happens here. We use the after_deploy phase to trigger Checkly and either pass or fail the build.

after_deploy: 
  - echo 'Deployment finished.'
    # Call Checkly trigger
  - curl "https://api-test.checklyhq.com/check-groups/4/trigger/$CHECKLY_TOKEN" > $PWD/checkly.json
  # Exit with an error status if we find more than 0 "hasFailures: true" in the output
  - if [ $(grep -c '"hasFailures":true' $PWD/checkly.json) -ne 0 ]; then exit 1; fi
```

Last but not least, you will need to set your `CHECKLY_TOKEN` as an [environment variable](https://docs.travis-ci.com/user/environment-variables/#defining-encrypted-variables-in-travisyml) in your `.travis.yml`. This allows it to be picked up by the trigger command without the need to expose it in plain text in your repository.

_Note: the Checkly Token is the very last part of the check's command line trigger URL._

{{< info >}}
This is a v1 integration. We are working on providing better feedback, longer runs, GitHub PR feedback and more customization options
for checks triggered directly via the API. 
{{< /info >}}
 
 {{< warning >}}
 The total run time of all checks cannot exceed 30 seconds or you will receive a timeout error. 
 {{< /warning >}}
  

