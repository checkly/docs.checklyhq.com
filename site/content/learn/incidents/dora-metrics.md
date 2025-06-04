---
title: How to Use DORA Metrics the Right Way | Checkly
displayTitle: How to Use DORA Metrics the Right Way
navTitle:  DORA Metrics for Performance Evaluation
description: Learn to track and interpret DORA’s four metrics—deployments, lead time, failure rate, and restore time—to improve your software delivery.
date: 2025-03-13
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
menu:
  learn_incidents
weight: 150
menu:
  learn_incidents:
      parent: Repair
---

DORA metrics help teams measure how well they deliver software. DORA stands for DevOps Research and Assessment. The four key metrics are:

1. **Deployment Frequency**: How often you release code.
2. **Lead Time for Changes**: How long it takes to go from code commit to live use.
3. **Change Failure Rate**: How often deployments cause problems.
4. **Time to Restore Service**: How quickly you fix issues when they happen.

DORA metrics measurements are inherently subjective to your team and **not a good standard for evaluation between two totally separate teams** working in separate shops. As just one example, if your team’s developers regularly do final integration checks by attempting a canary deployment of a branch, your team will have a much higher change failure rate than a team that does integration tests locally. However this difference won’t indicate a difference in team performance.

## How each DORA metric is measured, and why it matters

There’s an interesting variety in DORA metrics. Some are unequivocal in their interpretation (it’s always better to have a lower ‘time to restore service’), while others have no meaning outside context (I could write a script that makes small grammar edits and deploys them, massively boosting ‘deployment frequency’ with no benefit). Some are easy to measure like deployment frequency, others like change failure rate require some thought about *what* is being measured before we even ask why it matters. Here’s all four metrics in detail.

### Deployment Frequency

Deployment frequency measures how often a team successfully releases code to production.

Frequent deployments often show that a team has a strong CI/CD pipeline and works well together. It helps teams get feedback faster and adapt to changes quickly.

Unlike other DORA metrics, higher deployment frequency is better. To make it easier to track, some teams calculate the average time between deployments instead. A higher average time means fewer releases.

Measuring deployment frequency is simple. You just need to know when deployments happen. You can then count how often they occur daily, weekly, or monthly. If there are no deployments in a time period, you note that too.

More frequent deployments usually mean a faster and more agile team. Top teams (elite performers) deploy multiple times a day, while slower teams might deploy only once a month or less.

Deployment frequency is also an object lesson in why **DORA metrics don't translate well for comparison between teams**. If a single team starts deploying code more frequently it does indicate improvement, but just because one team deploys code every hour, and another team only deploys code twice a week, that's not a great indicator of a gap in performance.

![comic, transcript: 🧑🏻‍💼: Why are your DORA metrics worse than Team A's? 🧑🏽‍💻: Their deployment frequendy is way higher, but.🧑🏻‍💼: ...but? 🧑🏽‍💻: They don't use a CMS. 🧑🏻‍💼: So? 🧑🏽‍💻: So every new blog post requires a git merge. 🧑🏻‍💼: So their DORA metrics are- 🧑🏽‍💻: Apples and oranges, yup.](images/learn/dora-metrics01.png)

Factors like underlying code structure and QA practices can cause large differences between teams, so it's best to establish baselines for your team based on past performance.

### Lead Time for Changes

Lead time for changes measures how long it takes for code to go from being written to running in production. To calculate it, find the time between when a commit is made and when it’s deployed. Use the middle value (median) of these times over a set period.

Shorter lead times mean your team can deliver updates, fixes, or new features faster. This usually shows that your development and deployment processes are working well.

To measure lead time, start tracking when a pull request (PR) is created or merged. Then, find out when that code is deployed to production. You’ll need to link the PR to the deployment using an ID, like a tag that connects the two. Once you have the time differences, add them up and divide by the number of changes to get the average.

In general, shorter lead times are better. For example, top teams (elite performers) deploy changes in less than a day, while slower teams might take weeks or even months. Faster lead times mean your team can respond quickly to needs and keep improving.

### Time to Restore Services

Time to restore services measures how long it takes to fix a service after it fails. The clock stops when the issue is resolved, and the related bug or incident report is closed.

A shorter time to restore services means your team handles incidents well and your system is strong. It reduces downtime and keeps users happy.

Measuring this metric can be tricky because you need to know exactly when an incident starts and ends. Here are three ways to track it:

1. **Synthetic Monitoring**: Use tools to send regular requests to your service. If it fails, you know the exact downtime. However, it might miss issues where the service seems fine but isn’t working correctly.
2. **Error Logs**: Track errors or exceptions in your code. This can help spot issues, but it might also flag non-critical problems as incidents.
3. **Performance Thresholds**: Watch for unusual changes, like slow response times. Even if the service is technically up, users might feel it’s down if it’s too slow.

If you’re not already tracking incidents closely, you might need to start using observability tools or manually note incident times during post-mortems.

To calculate the metric, add up the time spent on all incidents and divide by the number of incidents.

Faster recovery times are better. Top teams (elite performers) fix issues in less than an hour, while slower teams might take days or even weeks.

### Change Failure Rate

Change failure rate measures how often deployments cause problems. It’s the percentage of deployments that fail out of the total number of deployments.

A lower change failure rate means your system is reliable and your testing works well. It shows that new changes are less likely to break things.

To measure this, you need to count how many deployments fail and compare it to the total number of deployments. However, this can be tricky because not all failures are the same. For example, a long outage might look better than many short ones, even if the short ones are less harmful.

Here are three ways to make this metric more accurate:

1. **Standard Rollback Process**: If your team always rolls back failed changes and tags them, you can track failures directly.
2. **Canary Deployments**: Use tools like Argo Rollouts to test changes on a small group before full deployment. Count rollbacks as failures.
3. **Incident Standards**: Set rules for what counts as a failure. For example, only count incidents that last longer than a certain time.

Change failure rate can feel less precise than other DORA metrics because it depends on how you define a failure. But it’s still useful for spotting trends.

To calculate it, divide the number of failed deployments by the total number of deployments in a set time.

A lower rate is better. Top teams (elite performers) keep their failure rate below 15%, while slower teams might see rates as high as 60%.

## DORA matters for developer velocity

If your code is easy to test and release, and your development environment is very close to production, you’ll have fewer rollbacks and faster releases. This speed isn’t just about technical skill—it shows your team is agile and better at meeting user needs.

Using DORA metrics isn’t just a technical task; it’s a must for platform engineers and team leaders. These metrics give a full picture of your development process, from writing code to deploying it and fixing issues. They show how agile, efficient, and fast your team is.

It’s easy to focus only on how much code your team produces, but DORA metrics remind us that the developer experience is just as important. A slow or error-filled deployment process can slow down even the best teams. Improving tools and making the developer experience smoother are key to boosting these metrics.

## Conclusions: Best practices for using DORA metrics

These metrics show how fast and reliable your software delivery is. But using them wrong can cause poor evaluation and hurt performance. Here’s how to do it right:

1. **Focus on Improvement, Not Comparison**: Use DORA metrics to find areas to improve, not to compare teams. Every team is different.
2. **Combine Metrics**: Look at all four metrics together. For example, fast deployments are good, but not if they cause many failures.
3. **Understand Context**: Metrics alone don’t tell the whole story. Talk to your team to understand why numbers are high or low.
4. **Avoid Over-Measuring**: Don’t track too many things. Stick to the four DORA metrics to keep it simple.
5. **Use Tools Wisely**: Tools can help track metrics, but don’t rely on them too much. Focus on what the numbers mean for your team.

DORA metrics are useful, but only if you use them to learn and improve, not to blame or stress your team. Keep it simple, focus on teamwork, and use the data to make your process better.