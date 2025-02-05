// This config sets up some shared constants and Playwright config to share in your Browser checks.

/*
Notice we use two sets of URLs:

1. One for running scripts in local development.
2. Two URLs for Preview and Production monitoring and test,
  where the ENVIRONMENT_URL is automatically replaced
  with the Preview URL when a Vercel deploy happens.
*/

const LOCAL_DEV_URL = 'http://localhost:3000'
const PREVIEW_URL = process.env.ENVIRONMENT_URL
const PROD_URL = 'https://www.checklyhq.com'

export const defaults = {
  baseURL: process.env.NODE_ENV === 'development' ? LOCAL_DEV_URL : PROD_URL || PREVIEW_URL,
  playwright: {
    viewportSize: {
      width: 1280,
      height: 720
    }
  },
  screenshotPath: 'test-results/screenshots'
}

export const alertChannelIds = {
  slack: 155587,
  opsGenieP3: 155589,
  opsGenieP1: 155588
}
