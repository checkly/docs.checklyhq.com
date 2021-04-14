---
title: Basic Usage
weight: 3
menu:
  docs:
    parent: "Headless Recorder"
---

The goal of Headless Recorder is to be easy to use but with enough depth to also handle more complex scenarios.

- Click the icon and hit **Record**.
- Hit <kbd>tab</kbd> after you finish typing in an `input` element.
- Click links, inputs and other elements.
- Wait for **full page load** on each navigation. The icon will switch from `rec` to `wait`.
- Click **Pause** when you want to navigate without recording anything. Hit **Resume** to continue recording.
- Click **Stop** to stop recording and generate the resulting code.
- Hit **copy to clipboard**.

With the code on your clipboard, you can save the code to a local file and run it, providing you have the Puppeteer or Playwright npm package
installed.
```shell
npm install puppeteer
npm install playwright
node my_generated_script.js
```

## On cookies and authentication

Headless Recorder does not (yet) record or store any of your session cookies or other local settings. This means you
can be logged in to some webapp and record a script, but on playback the script fails because you are not logged in.

To work around this limitation you can record the login sequence as part of your script. Always starting Headless Recorder when Chrome
is in Incognito Mode helps you dodge this pitfall, as it will become immediately clear when you are not logged in using
session cookies. You need to explicitly allow the Headless Recorder extension to run in Incognito mode on the details
section on the Extension page of your Chrome browser:

![headless authentication and cookies](/docs/images/headless-recorder/allow_incognito.png)


## Filling out forms

Headless Recorder has been tested to record the following standard html form inputs and related elements.

- `text` input elements like text and email.
- `radio` input elements.
- `select` or "drop down" elements.
- `checkbox` input elements.
- `button` or `a` submit elements.

As mentioned above, when typing in text inputs, hitting the <kbd>tab</kbd> key "confirms" the input text.
Not hitting <kbd>tab</kbd> will result in no input being recorded.


> Reminder: when providing login credentials or other confidential data in forms, make sure to filter them out
after recording. In Checkly, you can replace these credentials with environment variables in your browser check script.

The demo video below gives an impression on how filling out a form works.

{{< youtube d_9HEmtv52E >}}

## Screenshots

You can take two kinds of screenshots:

1. A screenshot of the **current visible page**.
2. A **clipped screenshot** of a part of the page.

Activate either mode by either using the right click context menu...

![headless recorder context menu](/docs/images/headless-recorder/context_menu.png)

...or using keyboard shortcuts.

| Action             | Short cut    |
|--------------------|--------------|
| Screenshot         | Ctrl+Shift+A |
| Screenshot Clipped | Ctrl+Shift+M |
