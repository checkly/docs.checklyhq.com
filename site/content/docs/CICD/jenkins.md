---
title: Jenkins
weight: 3
menu:
  integrations:
    parent: "CI/CD integration"
---

## Using the CLI in a CI/CD pipeline

{{< markdownpartial "/_shared/cli-basics-for-cicd.md" >}}

## Configuring Jenkins to run the Checkly CLI

As the Checkly CLI is a Node.js project, the main step you need to take is install the NodeJS plugin.

1. In Jenkins, go to **Manage Jenkins → Plugins → Available plugins** and look for the NodeJS plugin and install it.
2. After installing the NodeJS plugin, we need to configure it. Head over to **Manage Jenkins → Tools** and click "Add NodeJS"

![Jenkins Nodejs  config](/docs/images/cicd/cicd_jenkins_node.png)


We recommend using any Node.js stable version higher than 16.x.

## Set your Checkly credentials

Navigate to **Manage Jenkins → Manage Credentials** to add your Checkly account ID and API key to your preferred scope.
Store them as "secret text" and assign and ID to the credential.

![Jenkins Nodejs  config](/docs/images/cicd/cicd_jenkins_credentials.png)

## Configuring the Jenkins Pipeline

Add the `Jenkinsfile` to your repo that defines the basic stages and steps. Make sure to set up your SCM settings
correctly so Jenkins can fetch your git repo and look for the `Jenkinsfile` in the root of your project.

![Jenkins Nodejs  config](/docs/images/cicd/cicd_jenkins_scm_setup.png)



The actual contents of your `Jenkinsfile` will differ based on your code and how you deploy. But in general, your pipeline
should look as follows:

1. You deploy your application first.
2. You install the required dependencies for the Checkly CLI.
3. You run the `checkly test` command.

```groovy
// Jenkinsfile
pipeline {
    agent any

    tools {nodejs "Node 18"}
    environment {
        CHECKLY_API_KEY = credentials('checkly-api-key')
        CHECKLY_ACCOUNT_ID = credentials('checkly-account-id')
        CHECKLY_TEST_ENVIRONMENT='production'
    }

    stages {
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
        stage('Dependencies') {
            steps {
                sh 'npm ci'
            }
        }
        stage('checkly test') {
            steps {
                sh 'npx checkly test --record'
            }
        }
        stage('checkly deploy') {
            when {
                branch "main"
            }
            steps {
                sh 'npx checkly deploy --force'
            }
        }
    }
}
```
