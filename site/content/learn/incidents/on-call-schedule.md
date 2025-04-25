---
title: How to Set an On‑Call Schedule | Checkly Incident Response
displayTitle: How to Set an On-Call Schedule
navTitle:  On-Call Schedules - How to
description: Learn to design effective on‑call rotations—shift models, clear response rules, scheduling tools, mock drills, and fairness to prevent burnout.
date: 2025-03-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: 
menu:
  learn_incidents
weight: 10
menu:
  learn_incidents:
      parent: Classification
---

Once an incident is detected, it’s time to classify the incident and coordinate with your team. To all that, you’ll need an on-call schedule. This guide covers the necessary components for a successful on-call schedule.

## Why Have an On-Call Schedule?

Things break. People need help. No matter how well-designed, a software system that is constantly getting new features and scaling to meet demand will experience outages and other incidents. Putatively, an on-call schedule is there to make sure someone is always ready to fix problems, but really they tend to be adopted for another reason: burning out your best.

After the first inchoate stage of a software team, there will remain a tendency to bring all technical questions, at any hour of the day, to just 1 or 2 experts. These are often people who are both knowledgeable and possessed of a tendency to look at their phone during dinner. These very effective engineers will quickly get burnt out if they’re the only ones who can actually fix things during a crisis. As such, an on-call schedule can help focus minds as to who can cover during incidents, and who needs more training to get to that level.

## Steps to Set Up Your Schedule

First, decide who needs to be on call. Pick people who know how to handle problems and can respond quickly. Make sure everyone gets a turn so no one feels overworked.

Next, choose how long each shift will last. Some teams switch every day, while others cover a full week. Think about what works best for your team and how often emergencies happen.

Then, set clear rules for when and how the on-call person should respond. Decide what counts as an urgent problem and how fast they need to act. Make sure everyone knows how to reach them, whether by phone, Slack, or an alert tool.

After that, use tools to make it easier. A scheduling app like PagerDuty or Opsgenie can send alerts and track who’s on call. A shared calendar helps everyone see the schedule without confusion.

Finally, test the schedule before real problems happen. Send a practice alert to make sure it works. Ask the team for feedback and adjust if needed. A good on-call schedule keeps things running smoothly and helps everyone feel prepared.

### 1. Choose Who Is On Call

The first and arguably most important step of an on-call schedule is deciding who is eligible to help field reports of emerging issues. The number of available on-call engineers will affect every decision you make afterward.

- Pick team members who know how to handle emergencies.
- Make sure everyone gets a fair turn.

### 2. Decide the Rotation

Next, choose how long each shift will last. Some teams switch every day, while others cover a full week. Think about what works best for your team and how often emergencies happen.

You can divide your time by each person on rotation doing a  **week and weekend**, where one person covers on-call duties for a full seven days in a row. This gives them the rest of the month free if the team is large enough. While simple to manage, it can be exhausting since the same person handles all alerts day and night for a whole week. Teams with at least four people can rotate monthly, while smaller teams may need to switch every other week.

A second option is **workweek and weekend with a backup**, which adds a second person for support in case the primary on-call responder is unavailable. This makes response more reliable but requires at least four team members to avoid burnout. The backup must stay alert, which can be hard to enforce, and managing two schedules adds complexity. If the rate of incidents is low, the backup may go weeks without ever being used, and it’s natural to slack off after a while.

The third model, **daylight hours**, spreads coverage across time zones so no one works overnight. Team members only handle alerts during their normal work hours. This protects sleep schedules but requires careful coordination when passing incidents between shifts. Without enough people, some night coverage may still be needed. Larger teams can combine this with longer rotations to give everyone breaks.

It’s important to note that your team members will not all feel the same way about these rotations. If possible, let engineers choose a model that makes sense for them, and doesn’t simplistically assign a ‘fair’ system for how easy it is to administer. Remember that a small team can often get by with something like: ‘on-call rotates every day, if you need your day off you’re responsible for finding someone to switch with you.’

### 3. Set Clear Rules

Try to answer questions about on-call expectations early in the process, not during a post-mortem for an incident that went unread for 8 hours.

- When should the on-call person respond? (Example: within 30 minutes.)
- What counts as an emergency? (Example: system down, major errors.)
- How do people reach them? (Example: phone, Slack, PagerDuty.)
- What are some activities the on-call person should avoid during their shift? Can they fly on a plane and be offline, is it okay for them to be drunk or use drugs during their on call shift?

Answer these questions now, as a team, or face case-by-case problems and embarrassment later!

### 4. Use Tools to Help

Unless your team is tiny, you’ll need a few tools to help coordinate on call rotations. 

- **Rootly, Opsgenie, VictorOps, or something similar** – Automate alerts and rotations, and when more than one person is on-call
- **Create a Shared calendar** – Show who’s on call and when.
- **Start Simple -** Automated Slack messages might be all you need for your first on-call setup

A lot more could be written about how observability tools help during incidents, but those are considered in another guide, read on for more!

### 5. Make It Fair

Tech workers are happy to put up with a lot of ambiguity, complexity, and unpredictability in their jobs, but no one likes working in a situation that feels unfair.

- Avoid burnout. Don’t put the same person on call too often. - If you’re relying on one person to cover most of the on-call time, it’s time to take staff development seriously, and pair your on-call expert with someone who needs to gain those skills.
- Rotate holidays and weekends. - The more geographically diverse your team, the less likely you are to run into schedule conflicts.

### 6. Test It

As your team adjusts to a schedule and process, stage mock incidents to test out the process.

- Run a practice alert to make sure it works.
- Fix any problems before real emergencies happen.

Again if you’re having frequent incidents this may not be necessary, but if every incident isn’t following process, it’s time to practice a dry run!

### 7. Keep Improving

- **Ask the team for feedback** - It’s critical to perform post-mortems, even after successfully handled incidents, ask ‘what could have gone better’ about the on-call process.
- **Continuously update your process** - Ideally your team and your market will be growing throughout  each year, so the process that worked last year probably won’t keep working this year.

## Be Kind

Being on call can be stressful. Support your team. Say thanks. Help when needed.

### You Have One Team

On-call is one of the reasons that people list for leaving teams. Don’t destroy your team while trying to handle incidents, listen to your team members and find a solution that works for you. Spend your energy lifting each other up. A good on-call schedule keeps things running—and people happy.