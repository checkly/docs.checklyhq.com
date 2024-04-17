---
title: WebSockets
weight: 20
menu:
  resources:
    parent: "Multistep checks"
    identifier: "multistep-checks-websockets"
cli: true
---

To create a WebSocket check in Checkly, you'll need to write a script that establishes a WebSocket connection, sends messages, and validates responses.

## Set Up the WebSocket Connection
First, we'll establish a connection to the WebSocket server. Replace `wss://your.websocketserver.com` with the URL of your WebSocket server.

{{< tabs "Setup WebSocket Connection" >}}
{{< tab "Typescript" >}}
```ts
import { WebSocket } from 'ws'

const url = 'wss://your.websocketserver.com';
const ws = new WebSocket(url);
```
{{< /tab >}}
{{< tab "Javascript" >}}
```js
const WebSocket = require('ws');

const url = 'wss://your.websocketserver.com';
const ws = new WebSocket(url);
```
{{< /tab >}}
{{< /tabs >}}

## Handle WebSocket Events
Handle the key events like opening the connection, receiving messages, and encountering errors.

{{< tabs "Handle WebSocket Events" >}}
{{< tab "Javascript" >}}
```js
ws.on('open', () => {
  console.log('WebSocket connection established.');
  // Send initial message or subscription here, if necessary.
});

ws.on('message', (data) => {
  console.log('Received message:', data);
  // Add your message handling logic here.
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});
```
{{< /tab >}}
{{< /tabs >}}

## Sending and Receiving Messages
Implement the logic for sending messages and processing the received responses.

{{< tabs "Send/Receive WebSocket Messages" >}}
{{< tab "Javascript" >}}
```js
function sendMessage(message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message);
    console.log(`Message sent: ${message}`);
  } else {
    console.error('WebSocket is not open. Unable to send message.');
  }
}
```
{{< /tab >}}
{{< /tabs >}}


## Close the Connection
Ensure to properly close the WebSocket connection after your checks.

{{< tabs "Close WebSocket Connection" >}}
{{< tab "Javascript" >}}
```js
ws.on('close', () => {
  console.log('WebSocket connection closed.');
});
```
{{< /tab >}}
{{< /tabs >}}

## Example: Monitoring a WebSocket Connection
Here's the complete example script that demonstrates a WebSocket check. It sends a subscription message, prints out the echo'd response, handles different types of incoming messages and closes the connection after 5 seconds. We've also added an object assertion to check the data returned from the WebSocket is correct. If the message does not match, the script will throw an error, indicating a discrepancy in the expected data.

{{< tabs "Full WebSocket Script" >}}
{{< tab "Javascript" >}}
```js
import { WebSocket } from 'ws';
import { expect } from 'expect';

const url = 'wss://echo.websocket.org';
const ws = new WebSocket(url);

let isFirstMessage = true; // Flag to track the first message

ws.on('open', () => {
  console.log('WebSocket connection established.');
  sendMessage(JSON.stringify({ action: 'subscribe', channel: 'updates' }));

  // Close the connection after 5 seconds
  setTimeout(() => {
    ws.close();
    console.log('WebSocket connection closed after 5 seconds.');
  }, 5000); // 5000 milliseconds = 5 seconds
});

ws.on('error', (error) => {
  console.error('WebSocket error:', error);
});

ws.on('message', (data) => {
  if (isFirstMessage) { // Handle the first non-JSON message here
    const messageString = data.toString('utf-8'); // or 'ascii' if you know it's ASCII
    console.log('First message (non-JSON):', messageString);
    isFirstMessage = false; // Update the flag after handling the first message
  } else { // Process JSON echo response
    try {
      const message = JSON.parse(data);
      if (message) {
        console.log('Notification received:', message);
        // Add an assertion to confirm the JSON returned is the same as what we sent
        expect(message).toMatchObject({ "action": "subscribe", "channel": "updates" })
      }
    } catch (error) {
      console.error('Error parsing received message:', error);
    }
  }
});

ws.on('close', () => {
  console.log('WebSocket connection closed.');
});

function sendMessage(message) {
  if (ws.readyState === WebSocket.OPEN) {
    ws.send(message);
    console.log(`Message sent: ${message}`);
  } else {
    console.error('WebSocket is not open. Unable to send message.');
  }
}
```
{{< /tab >}}
{{< /tabs >}}

Don't forget the essentials:

- Error Handling: Implement robust error handling for scenarios like connection failures and timeouts.
- Message Validation: Add logic to validate incoming messages to ensure data integrity.
- Closing Connections: Always close the WebSocket connection gracefully to avoid resource leaks.
