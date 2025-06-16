---
title: The Layers of the Testing Pyramid
description: 
  This article gives a tour of the testing pyramid’s layers with examples, and shows you how each part is required for a complete picture of system performance.
date: 2025-04-01
author: Nočnica Mellifera
githubUser: serverless-mom
tags:
  - basics

weight: 29

menu:
  learn_playwright:
    parent: "Getting started"
---

When you begin your journey in QA, SRE, Development, or Operations, you’ll ask about testing and hear ‘we test that on a different layer of the pyramid’ or ‘we test that during unit testing.’ As you grow, you’ll suggest an end-to-end test and hear “that’s not end-to-end testing, that’s integration testing.” It seems as if everyone else understands the layers of the testing pyramid, and which tests belong where. Really though, the separate are fairly abstract, without clean divisions either technically or conceptually. This article gives a tour of the testing pyramid’s layers with examples, and shows you how each part is required for a complete picture of system performance.

## How do we know our app is working?

We know our app is working by testing, but this begs the question: who should test what, when? Let’s take the tiniest possible failure: trailing whitespace in user data. Should the React frontend refuse to submit form fields with extra whitespace, should the application automatically remove whitespace before sending database requests, or should the DB controller automatically remove whitespace? The question: “in what layer should these checks happen?” brings us to the testing pyramid.

## The Testing Pyramid in Full

Originally conceived by Mike Cohn, and then popularized by Martin Fowler, the testing pyramid shows categories of tests, with the slowest on top and the fastest on the bottom. 

![The Testing Pyramid](/learn/images/testing-pyramid-01.png)

The pyramid shape refers to the ideal distribution of tests: you should have dozens or hundreds of unit tests for every one end-to-end test. Some modifications visible on my version above:

- integration tests and unit tests are only separated by a dotted line since in practice they may not be technically distinct, and may even be written and run by the same team
- A second axis arrow indicates that on the bottom of the testing pyramid, the tests are more isolated, while on the top tests are naturally very integrated.

Next let’s briefly describe the layers, along with how they work in a modern cloud native architecture.

## Unit Tests - with examples

A unit test is a highly isolated test that only works with a tiny chunk of code, possibly the code in a single file, or even a single function. A unit test is by its nature extremely high performance, and can run as frequently as the developer saves her work (or even with every entered newline). 

In the following example, we have the unit test for a single function called `noWhiteSpace`

```ts
//noWhiteSpace.test.ts
import { noWhiteSpace } from './noWhiteSpace';

describe('noWhiteSpace', () => {
  it('should remove all whitespace from each string in the array', () => {
    const input = [' hello ', 'world  ', '  foo  bar  '];
    const expected = ['hello', 'world', 'foobar'];
    expect(noWhiteSpace(input)).toEqual(expected);
  });

  it('should handle strings with internal whitespace', () => {
    const input = ['a b c', 'd  e   f', 'g h i j'];
    const expected = ['abc', 'def', 'ghij'];
    expect(noWhiteSpace(input)).toEqual(expected));
  });

  it('should handle tabs and newlines', () => {
    const input = ['\ttext\n', 'with\twhitespace\r\n'];
    const expected = ['text', 'withwhitespace'];
    expect(noWhiteSpace(input)).toEqual(expected);
  });

  it('should return empty strings for whitespace-only elements', () => {
    const input = ['   ', '\t', '\n\r'];
    const expected = ['', '', ''];
    expect(noWhiteSpace(input)).toEqual(expected);
  });

  it('should handle an empty array', () => {
    expect(noWhiteSpace([])).toEqual([]);
  });

  it('should not modify strings without whitespace', () => {
    const input = ['hello', 'world', 'typescript'];
    expect(noWhiteSpace(input)).toEqual(input);
  });

  it('should handle mixed whitespace characters', () => {
    const input = ['  h\te\nl\rl\to\t'];
    const expected = ['hello'];
    expect(noWhiteSpace(input)).toEqual(expected);
  });
});
```

Some observations about unit tests:

- They can (as this one does) work as effective documentation of what the tested code is supposed to do
- Unit tests could be written before the actual code, a process called Test-driven Development (TDD)

Unit tests are intended to show that an individual block of code does what it says on the tin, and with their speed of execution should be running during the developer’s process of writing new code. Unit tests may be gathered into larger blocks and run later in the process, but since the higher layers take more than a few seconds to run, unit tests are the only ones that can run at the speed developers write code.

![the SDLC](/learn/images/testing-pyramid-02.png)

*Where unit testing fits in the Software Development Life Cycle (SDLC)*

In a cloud-native environment, unit tests are the one layer that’s largely unchanged: even if all our environments starting with Test are on the cloud, it’s likely that writing code and running code both happen on the developer’s laptop. For cloud-based IDE’s, the process of writing and running unit tests remains similar, with the cloud environment running unit tests with high frequency.

What are the limitations of unit tests? In the example above we tested a very generic function to remove whitespace, but in the real world most of our functions will be called something like `userPreferencesUpdate` , and while our unit tests can test the code within that function, it can’t test the function working with real users. As such the unit test will feed in some fake user data and look at the function’s output, without reference to how real data stores, queues, routers, or other services might react. A unit test, then, exists in a universe of ‘stubs’ and ‘mocks’ which simulate the other services that make up your environment. To go one step further and either run or simulate larger chunks of your application, we go on to Integration tests.

## Integration tests - something in the middle

Integrations test are supposed to show how well your code (or ideally your whole microservice) runs in something like your production environment. The layer includes two largely separate concepts:

- Running your code in an environment where most of your application’s services are really running, and checking how it performs, looking for errors
- Creating stubs which give fake input to your microservice, and mocks which mechanistically simulate the other services, and testing that your service runs as designed

While a stub is as simple as a stored JSON with an identical request object that will always go in to your service at test time, a mock is a more fuzzy concept, but generally it appears to operate like another service without doing the actual work. Here’s an example of a mock:

```tsx
//userUpdateMock.ts
interface UpdateUserRequest {
  userId: string;
  newName: string;
}

interface UpdateUserResponse {
  userId: string;
  updatedName: string;
  timestamp: string;
  status: string;
}

export function mockUpdateUserName(request: UpdateUserRequest): UpdateUserResponse {
  // Validate the request
  if (!request.userId || !request.newName) {
    throw new Error('Invalid request: userId and newName are required');
  }

  if (typeof request.newName !== 'string' || request.newName.trim() === '') {
    throw new Error('Invalid request: newName must be a non-empty string');
  }

  // Simulate processing delay
  const processingDelay = Math.floor(Math.random() * 200) + 100; // 100-300ms

  // Return the mock response
  return {
    userId: request.userId,
    updatedName: request.newName.trim(),
    timestamp: new Date().toISOString(),
    status: 'success',
  };
}
```

In this example, the mock almost looks like application code, it even validates the input slightly! But think about it: no request is made to any data store, and therefore there’s no check to see if this is even a valid userID, much less whether we’ve successfully updated their info.

When we drew a dotted line between integration tests and unit tests, it was to indicate that it’s never 100% clear the distinction between a (simple, fast) unit test and a (slower, more comprehensive) integration test. It’s likely that integration tests will be run somewhere in between the moment-to-moment development process and the deployment of code to production. 

### Integration testing’s more rigid cousin: contract testing

In microservice architecture, ideally microservices would interact in tightly controlled ways. The schema for communication, responses, and the logic of those responses can be clearly defined as rigid contracts between all services. Contract testing conceives a system where services can always be tested by sending fixed requests, and receiving responses that conform to those contracts. There are three primary concerns with an over-reliance on contract testing:

- In trying to define completely fixed contracts on service interactions, you’re limiting the growth of your system as the complexity outstrips the ability of contract documentation.
- Contracts often expect consistent, readable information in data stores that doesn’t perfectly reflect reality.
- The nature of failures during service interaction is rarely due to ‘services not upholding their contracts’ and as such contract testing fails to find failures before users do.

Integration testing of some sort is a necessary part of the deployment process. 

## End-to-end testing: testing like the users do

The testing period requires, an addition to reflect testing in the real world. After all, once all the pre-deployment testing is over, the production code rolled out, and the application is updated, don’t we all go check out the site to make sure it looks ‘right’?

![Manual Testing atop the testing pyramid](/learn/images/testing-pyramid-03.png)

*Many’s the night on an on-call team I’ve used my phone to check our production site when a user-reported error wasn’t showing up on any dashboard*

When your default action is to go and click around on the site to really know that things are working, you’re showing that your end-to-end testing doesn’t have your full confidence. End-to-end tests are supposed to simulate the users interacting with your service. Passing an end-to-end test suite shows that all business critical paths through your application are working as expected. With testing tools like Playwright, there should be no user behavior that you can’t simulate. 

```tsx
await page.locator('#item-to-be-dragged').dragTo(page.locator('#item-to-drop-at'));
```

*Not even tricky UI behavior like drag-and-drop requires manual programming in Playwright*

At base, the advantage of end-to-end testing is that it answers the real question of testing: ‘will this work for users or not?’ the other phases of testing answer questions more akin to: ‘does this code function without throwing errors?’ or ‘is this service fulfilling its contract to other services?’ Those are important questions for earlier phases of the SDLC. But once our tests are going into the hands of users, we must simulate that real user behavior and record if everything works.

### From E2E Testing to E2E Monitoring

If we agree on the importance of end-to-end testing, it begs the question if testing should stop after deploy time. Thousands of unforseen interactions can break a production service even after the code is tested post-deployment, and our users are certainly using the service all the time. Shouldn’t our testing also continue after the code is out? For end-to-end testing on a cadence, there’s Checkly, which uses the power of playwright to test your sites, services, and APIs around the clock. [Get started today](https://www.checklyhq.com/docs/)!

## What problem is the testing pyramid trying to solve?

While it sadly causes many arguments about which tests belong where or which layer is most important, the testing pyramid is meant to acknowledge that each test type has a role to play, and the differences in performance is natural. 

## Conclusions: Every Layer of Testing Matters

We care about testing because ultimately there’s one layer of testing that no one wants to use: our users. If there’s a bug, they’ll find it, if there’s holes in a data flow, their data will fall into it. If there’s an edge case our users will find it. And every time a user is the first one to detect a problem, it hurts their trust in our service.

![The Testing Pyramid](/learn/images/testing-pyramid-04.png)
*The testing phase no one wants to use*

The testing pyramid provides a structured approach to ensuring software quality by balancing different types of tests—each with its own strengths and trade-offs. Unit tests offer rapid feedback during development, verifying small pieces of logic in isolation. Integration tests bridge the gap, ensuring components work together as expected, whether through real service interactions or carefully designed mocks. Finally, end-to-end tests validate the system from the user’s perspective, confirming that critical workflows function correctly in a production-like environment.

While the boundaries between these layers can sometimes blur, their collective purpose remains clear: to catch issues early, reduce risk, and build confidence before code reaches users. A well-balanced testing strategy leverages all three layers, recognizing that no single type of test can guarantee success on its own. By understanding and applying the principles of the testing pyramid, teams can optimize their testing efforts—maximizing coverage, efficiency, and reliability throughout the software development lifecycle.

Ultimately, the goal is not to rigidly categorize tests but to ensure comprehensive validation at every stage. Whether you're writing unit tests for a utility function, mocking service interactions in integration tests, or automating user journeys with Playwright, each layer contributes to a more robust, resilient application. The testing pyramid isn’t just a model—it’s a reminder that quality is built step by step, from the smallest unit to the full user experience.

## Dive Deeper into the Testing Pyramid with Real World Applications

In a recent Webinar, the Checkly team got to talk about how the Testing Pyramid affects testing strategies for real world applications like React apps. Watch the whole session here:

{{< youtube id="Ev7l5atRfFw" >}}
