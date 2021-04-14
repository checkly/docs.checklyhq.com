---
title: Jenkins
weight: 5
menu:
  docs:
    parent: "CI/CD integration"
---

You can trigger your checks from your Jenkins builds. Below are two examples that leverage the 
Checkly [command line trigger](/docs/cicd/triggers/) feature to run checks through Jenkins Pipelines or standalone jobs.

In both cases, you will need to set your `CHECKLY_TOKEN` as an environment variable for your job. This allows it to be picked up by the trigger command without the need to expose it in plain text in your repository.

![Jenkins Pipeline Checkly Token Config](/docs/images/cicd/jenkins-param.png)

_Note: the Checkly Token is the very last part of the check's command line trigger URL._

## Jenkins Pipelines example
This `Jenkinsfile` is from our [checkly-ci-test GitHub repo](https://github.com/checkly/checkly-ci-test). This file contains different stages (here shown as generic placeholders) going from application build to deployment, with an added post-deployment stage to trigger Checkly checks and mark the build passed or failed depending on the outcome.

The content of each previous stage will of course be highly specific to your stack, environment and build process.
```groovy
// The pipeline structure hinted at is just to contextualise the example
pipeline {
    agent any
    stages {
            
        stage('Build') {
            steps {
                // ...
            }
        }

        stage('Deploy') {
            steps {
                // ...
            }
        }

        // ...

        // The interesting part happens here. We use an additional pipeline stage to trigger Checkly and either pass or fail the build.
        stage('Trigger Checkly') {
            steps {
                sh 'echo "Deployment finished."'
                // Call Checkly trigger
                sh 'curl "https://api-test.checklyhq.com/check-groups/4/trigger/${CHECKLY_TOKEN}" > ${PWD}/checkly.json'
                // Exit with an error status if we find more than 0 "hasFailures: true" in the output
                sh 'if [ $(grep -c \'"hasFailures":true\' $PWD/checkly.json) -ne 0 ]; then exit 1; fi'
            }
        }
    }
}
```

## Standalone Jenkins job config example
If you are not using Jenkins Pipelines, you can leverage Checkly in your standalone Jenkins jobs by adding a build step to kick off your checks. Just select `Execute shell` as build step type and paste in your shell commands.

An example could look like the following:

![Jenkins Job Checkly Build Config](/docs/images/cicd/jenkins-freestyle-build.png)

{{< info >}}
This is a v1 integration. We are working on providing better feedback, longer runs, GitHub PR feedback and more customization options
for checks triggered directly via the API. 
{{< /info >}}
 
 {{< warning >}}
 The total run time of all checks cannot exceed 30 seconds or you will receive a timeout error. 
 {{< /warning >}}
  

