---
title: Run Checks in Private Locations

header: 
  tag: Terraform
  headline1: Run Checks in Private Locations
  description: Your internal applications and APIs deserve the same care as the public ones. With our Checkly Agent, you can test your private APIs and applications using Checkly, too.
  button1: 
    text: Get started
    href: '#'
  button2: 
    text: Read documentation
    href: '#'
  image: 
    src: 
      default: /private-locations/private-locations-terminal.png
      retina: /private-locations/private-locations-terminal@2x.png
    width: 610
    height: 157
    alt: docker run -e API_KEY="pl_..." -d ghcr.io/checly/agent:latest

intro:
  headline1: Countless new check locations running in your infrastructure
  feat1:
    image:
      src: 
        default: /private-locations/features-01.png
        retina: /private-locations/features-01@2x.png
      width: 464
      height: 220
      alt: ""
    headline: Works with your on-prem locations
    text: Run checks from our infrastructure in Ireland, the US or São Paulo, or your own one like your private data center.
  feat2:
    image:
      src: 
        default: /private-locations/features-02.png
        retina: /private-locations/features-02@2x.png
      width: 450
      height: 220
      alt: ""
    headline: Manage your monitoring parameters
    text: Define appropriate check intervals, store check results over time, and get alerts when things go wrong.
  feat3:
    image:
      src: 
        default: /private-locations/features-03.png
        retina: /private-locations/features-03@2x.png
      width: 450
      height: 220
      alt: ""
    headline: One setup for local and cloud
    text: Use the same monitoring and alerting infrastructure for both public and internal applications and APIs.

how:
  headline: How it works?
  paragraph: Managing your checks, groups, alert channels and other monitoring resources should never be the bottleneck for shipping more code or increasing visibility into the state of your systems.
  how1:
    text: A running Checkly Agent continuously polls our backend to learn about pending checks.
    video: /private-locations/how-it-works-1.mp4
  how2:
    text: It runs the tests and reports the results back to the Checkly infrastructure.
    video: /private-locations/how-it-works-2.mp4
  how3:
    text: If registered agents go down and stop asking for new checks to run, we’ll notify you immediately.
    video: /private-locations/how-it-works-3.mp4

getStarted:
  tag: Get started
  headline: Kickstart your private location in Checkly in 3 simple steps
  item1:
    headline: Create private location
    text: Create a new private location and a new API key from settings.
    image:
      src: 
        default: /private-locations/get-started-01.png
        retina: /private-locations/get-started-01@2x.png
      width: 602
      height: 412
      alt: ""
  item2:
    headline: Install the container
    text: Install and run the container in your infrastructure using this API key to retrieve, run and store checks and their results.
    image:
      src: 
        default: /private-locations/get-started-02.png
        retina: /private-locations/get-started-02@2x.png
      width: 570
      height: 54
      alt: ""
  item3:
    headline: Create checks
    text: Write your checks in the Checkly UI and get your internal application testing rollin’.
    image:
      src: 
        default: /private-locations/get-started-03.png
        retina: /private-locations/get-started-03@2x.png
      width: 374
      height: 301
      alt: ""
---
