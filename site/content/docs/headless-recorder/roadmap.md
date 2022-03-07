---
title: Roadmap
weight: 5
menu:
  docs:
    parent: "Headless Recorder"
---

We created Headless Recorder (formerly know as Headless Recorder) as a cool Sunday afternoon side project while working on Checkly. The project is now at
20k+ users and 10K GitHub stars! Things were a little quiet around the project, but that's going to change.

Checkly is growing and we want to double down on making Headless Recorder the most awesome 100% open source E2E test
recorder on the planet. To be 100% transparent, we want to do this because:

1. It is good for unsucking E2E test creation in general.
2. It is therefore good for Checkly users.

## Survey results

We ran a [survey]((https://surveys.hotjar.com/s?siteId=717179&surveyId=137462)) among Headless Recorder users the last months.
We got ~400 responses. Here are the annotated results.

**1. What are you using Headless Recorder for now?**

|   | | count    | % respondents      |   % answers    |
|---|------------------------------------------------|-----|-------|-------|
| **A** | **Recording scripts for E2E testing**              | **256** | **64.3%** | **37.4%** |
| B | Recording scripts for scraping data            | 161 | 40.5% | 23.5% |
| C | Recording scripts for monitoring               | 98  | 24.6% | 14.3% |
| D | Recording scrips for one-off automation        | 157 | 39.4% | 23%   |
| E | Other (please specify)                         | 12  | 3%    | 1.8%  |

*684 answers from 398 respondents.*

**2. If you could add one feature to Headless Recorder, what would it be?**

|   | |  count   |    %   |
|---|-----------------------------------------------------------------------|-----|-------|
| **A** | **Automatic cookie and authentication handling**                          | **125** | **31.4%** |
| B | Taking screenshots                                                    | 40  | 10.1% |
| C | Better click / mouse & hover handling                                 | 113 | 28.4% |
| D | Running & debugging of scripts directly in the browser                | 93  | 23.4% |
| E | Other (please specify)                                                | 27  | 6.8%  |

*398 respondents*

**3. Which other test & script automation tools do you use?**

| |                        | count    | % respondents      |   % answers    |
|-----------|------------------------|-----|-------|-------|
| A         | Cypress                | 89  | 22.4% | 14.2% |
| **B**         | **Selenium / Webdriver**   | **183** | **46%**   | **29.2%** |
| C         | Nightwatch             | 29  | 7.3%  | 4.6%  |
| D         | Jest                   | 166 | 41.7% | 26.5% |
| E         | Mocha                  | 81  | 20.4% | 12.9% |
| F         | Cucumber               | 39  | 9.8%  | 6.2%  |
| G         | Other (please specify) | 40  | 10.1% | 6.4%  |

*627 answers from 398 respondents*

**4. What do you expect from a Pro version of Headless Recorder?**

This is an open ended question. Here is a curated overview of replies:

- better / smarter selector logic
- extract data from elements and create assertions
- video recordings
- better code output
- play the recorded script directly
- touch events
- mouse tracking
- hover tracking
- better handling of iframes, tabs and new windows


**5. How would you score the current version of Headless Recorder?**


⭐️⭐️⭐️⭐️⭐️ 84 / 21,1%
⭐️⭐️⭐️⭐️ **148 / 37,2%**
⭐️⭐️⭐️ 136 / 34,2%
⭐️⭐️ 23 / 5,8%
⭐️ 7 / 1,8%


## Roadmap (work in progress)

Based on our own findings at Checkly and the survey results, we are going to start working on a new version of Headless Recorder.
As always, we cannot give any hard promises on dates or features, but this is an initial sketch of what we want to achieve.

- Support Puppeteer & Playwright.
- Support Jest and Mocha test creation with assertions.
- Record and playback in the browser.
- In-screen helpers for targeting the right selectors.
- Handling of authentication scenarios.
- Export to file or 3rd party service.


