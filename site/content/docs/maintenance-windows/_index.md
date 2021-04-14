---
title: Overview
weight: 1
menu:
  docs:
    parent: "Maintenance windows"
    identifier: overview-maintenance-windows
---

You can schedule planned maintenance for your API, app or website using Checkly's maintenance windows. During maintenance 
windows, checks that are part of a specific window are not scheduled to run, saving you the headache of ignoring alerts and
having big red callouts on your dashboard. Maintenance windows are also exposed on our [public api](/docs/api)


## Creating a maintenance window 

Adding a maintenance window is simple. Navigate to the maintenance windows overview indicated by the wrench icon on the 
menu and click "create new". You're now on the maintenance window editor.

![maintenance window editor](/docs/images/maintenance-windows/maintenance-windows-editor.png)

After giving your window an appropriate name, the core options you have are:

## Setting a schedule

Set your preferred starting date and time for your maintenance window. **Note that all times are in UTC.** 

## Setting repeats
If your maintenance window repeats at a certain cadence, toggle the **repeat** option. Here you can set

1. The amount of repetitions.
2. The unit of repetition, i.e. **Day**, **Week** or **Month**.
3. The date on which the repetition cycle should end.

{{< info >}} If you schedule a window on the 31st and add a **monthly repeat cycle**, your schedule will also activate on
   the 30st of the revelant months and the 28th or 29th of February depending on the leap year.{{< /info >}}

## Adding checks and check groups

You need to select which checks and/or check groups are targeted by your maintenance window. You do this by:
 
- Adding the relevant check tags.
- Adding the relevant check group tags.

This way, any checks or check groups created *after* creating your maintenance window can still be made part of the window; no
need to update the maintenance window configuration. Just set the correct tags.
