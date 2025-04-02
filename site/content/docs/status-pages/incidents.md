---
title: Incidents - Checkly docs
displayTitle: Incidents  
navTitle: Incidents
weight: 48
menu:
  resources:
    parent: "Status Pages"
---

Incidents are used to communicate downtime on one or more services. You can open incidents manually as part of your incident management process, or automatically by connecting a check to a service using incident automation. 

When an incident is posted, a notification will be sent to all users subscribed to the status page, unless you opt out of notifications when creating the incident update.

## Creating an incident

Create an incident when you want to communicate downtime or known issues of your services to users via your status page.

1. Click ‘Status page’ in the sidebar and open your status page.
2. Click ‘Add incident’
3. Enter the name of the incident
4. Select the severity of the incident
5. Select which services are impacted in the dropdown list.

> Note that incidents will be posted on all status pages where a service is present. [See Services for more details](/docs/status-pages/#services).

6. Provide an incident update message.
7. Select the status of the incident.
8. If you want to backfill the incident, select `Use custom date`. See [Backfilling incidents for more information](/docs/status-pages/#backfilling-an-incident).
9. Select if you want to notify subscribers of your status page about the incident.
10. Click ‘Create incident’

Your incident will now appear on all status pages that show the selected service(s).

## Updating an incident

To update an ongoing incident go to the ‘Incidents’ tab on your status page and select the incident to update.

![Incidents view](/docs/images/status-pages/status-pages-incidents-1.png)


Here you can post a new status update for the incident, or you can edit existing updates. You can also edit the impacted services or the incident severity, and delete the incident.

## Incident notifications

Whenever you post an incident update, Checkly can automatically send email notifications to users subscribed to your status page.

Emails are sent out only when an update is first posted. Notifications are not sent again if the incident update is edited.

If you want to post an incident update without notifying your subscribers you can uncheck the ‘Notifications’ checkbox when updating the incident.
![Incident notification settings](/docs/images/status-pages/status-pages-notifications-2.png)


Incident notifications contain information about the incident name, the severity and status as well as which services are impacted.
![Example notification](/docs/images/status-pages/status-pages-notifications-1.png)


## Subscribing to incident notifications

Subscribing to incident notifications is done on your status page. To subscribe, a user needs to enter a valid email address. A verification email will be sent to the registered email, and only after confirming the subscription will the user start receiving incident notifications.

## Incident automation

Automatically open incidents whenever a check would alert with incident automation. The incident will be automatically resolved when the check recovers.

Incident automation works by connecting a check to a service. When the check fails and triggers an alert it will also open an incident on the connected service. Multiple checks can be connected to the same service through incident automation.

![Incident automation settings](/docs/images/status-pages/status-pages-incident-automation-1.png)

1. Open your check from the home dashboard.
2. Click ‘Edit’ in the check overview page.
3. For API and TCP checks, click the ‘Incident triggers’ tab. For Browser and Multistep checks, first click ‘Settings’ then ‘Incident triggers’.
4. Check the ‘Enable incident automation’ checkbox.
5. Fill in the incident name, a first status update and the severity of the incident.
6. Select which service the incident should be opened on.
7. Select if the status page subscribers should be notified when the automatic incident updates are posted.
8. Save your check.

## Backfilling an incident

Backfilling allows you to add incidents for downtime that happened in the past. Use backfilling to provide accurate uptime information to your users.

To backfill an incident, follow the steps 1 - 7 in the [Creating an incident](/docs/status-pages/incidents/#creating-an-incident) process. Next, select ‘Use custom date to backfill incident’ and pick the date and time when the incident started.

![Incident backfilling](/docs/images/status-pages/status-pages-backfilling-1.png)


We recommend to uncheck notifications when backfilling incidents to avoid notifying customers about resolved incidents.

If you only want to provide the history of the incident, you can set the first incident update to resolved. This will correctly show the incident as having occurred, but without a duration. If you want to have correct uptime on your service you should post two incident updates, with the timestamps for when the incident started and resolved respectively.