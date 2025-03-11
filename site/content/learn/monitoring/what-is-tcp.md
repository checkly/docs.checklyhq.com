---
title: What is TCP? - how it works and why it matters to application developers
displayTitle: Understanding TCP for Application Developers
navTitle:  What is TCP?
description: Explore web application monitoring to boost performance and reliability with real user insights, performance tracking, and top tools.
date: 2025-02-15
author: Nocnica Mellifera
githubUser: serverless-mom
displayDescription: Understanding the basics of TCP can help you build better, more reliable applications. This document will explain what TCP is, how it works, and what you need to know as an application developer.
menu:
  learn_monitoring
weight: 90
menu:
  learn_monitoring:
      parent: Protocols
---

As an application developer, you might think that Transmission Control Protocol (TCP) is something only network engineers need to worry about. However, as application developers take on more of the operational design and running of their applications, these previously 'low level' protocols come to the fore. Understanding the basics of TCP can help you build better, more reliable applications. This document will explain what TCP is, how it works, and what you need to know as an application developer.

## What is TCP?

TCP stands for Transmission Control Protocol. It is one of the main protocols used in the Internet Protocol (IP) suite. TCP is responsible for ensuring that data sent from one device to another arrives correctly and in the right order. TCP connections underlie the application-layer connections like HTTP connections that we're more familiar with as app developers. It is a connection-oriented protocol, which means it establishes a connection between the sender and receiver before data is sent.

## Why Should Application Developers Care About TCP?

Even though TCP operates at a lower level than your application code, it directly impacts how your application performs. Here are a few reasons why you should care about TCP:

1. **Non-http services**: TCP is used (without any HTTP layer) by databases, message queues, and mail servers, all of which your application may rely on to deliver the best customer experience. Understanding how TCP works will help you debug problems integrating these dependencies.
2. **TCP is part of flow control**: TCP manages the rate at which data is sent to prevent overwhelming the receiver, by understanding these components, you protect your application from getting rate limited and experiencing edge case failures
4. **Connection management**: TCP handles the establishment, maintenance, and termination of connections between devices, and with dynamic services like user-defined containers you may need to manage these connections more than you would expect!

Understanding these aspects can help you optimize your application's performance and troubleshoot issues more effectively.

## How TCP Works

### TCP Connection Establishment

Before data can be sent, a TCP connection must be established between the sender (client) and the receiver (server). This process is known as the **three-way handshake**:

![A TCP Handshake](/learn/images/tcp_handshake.png)

1. **SYN**: The client sends a SYN (synchronize) packet to the server to initiate a connection.
2. **SYN-ACK**: The server responds with a SYN-ACK (synchronize-acknowledge) packet to acknowledge the request.
3. **ACK**: The client sends an ACK (acknowledge) packet back to the server to confirm the connection.

Once the three-way handshake is complete, the connection is established, and data can be transmitted.

### Data Transmission

After the connection is established, data is sent in segments. Each segment contains a sequence number that helps the receiver reassemble the data in the correct order. The receiver sends an acknowledgment (ACK) for each segment received. If the sender does not receive an ACK within a certain time, it will retransmit the segment.

### Flow Control

TCP uses a mechanism called **flow control** to ensure that the sender does not overwhelm the receiver with too much data. The receiver advertises a window size, which indicates how much data it can accept. The sender adjusts the amount of data it sends based on this window size.

### Congestion Control

TCP also implements **congestion control** to prevent network congestion. If the network is congested, TCP will reduce the rate at which it sends data. This is done using algorithms like **Slow Start**, **Congestion Avoidance**, and **Fast Retransmit**.

### Connection Termination

When the data transfer is complete, the TCP connection is terminated using a four-step process:

1. **FIN**: The client sends a FIN (finish) packet to the server to indicate that it wants to close the connection.
2. **ACK**: The server sends an ACK packet to acknowledge the FIN packet.
3. **FIN**: The server sends its own FIN packet to the client.
4. **ACK**: The client sends an ACK packet to acknowledge the server's FIN packet.

After this process, the connection is closed.

## Key TCP Concepts for Application Developers

### Ports and Sockets

In TCP, communication is identified by a pair of **sockets**. A socket is a combination of an IP address and a port number. The IP address identifies the device, and the port number identifies the specific application or service on that device.

As an application developer, you need to be aware of the ports your application uses. Common services use well-known ports (e.g., HTTP uses port 80, HTTPS uses port 443), but your application may use different ports.

### Buffering

TCP uses buffers to store data before it is sent or after it is received. As a developer, you can control the size of these buffers, which can impact performance. Larger buffers can improve throughput but may increase latenc.

### Keep-Alive

TCP connections can be kept alive even when no data is being transmitted. This is useful for applications that need to maintain a connection for a long time. However, keep-alive packets can consume network resources, so you should use them judiciously.

### Timeouts

TCP uses timeouts to detect when a connection is no longer active. If no data is received within a certain time, the connection may be closed. As a developer, you can configure these timeouts to suit your application's needs.

### Error Handling

TCP handles most errors automatically, but you should still be aware of potential issues. For example, if a connection is lost, TCP will attempt to retransmit data, but if the connection cannot be reestablished, your application may need to handle the error.

## TCP and Application Performance

### Latency

Latency is the time it takes for data to travel from the sender to the receiver. TCP introduces some latency due to the three-way handshake, acknowledgments, and congestion control. Understanding how TCP affects latency can help you optimize your application's performance.

### Throughput

Throughput is the amount of data that can be transmitted in a given time. TCP's flow and congestion control mechanisms can impact throughput. By tuning buffer sizes and window sizes, you can improve your application's throughput.

### Scalability

TCP connections consume resources on both the client and server. If your application needs to handle many simultaneous connections, you should consider how TCP's connection management affects scalability. Techniques like connection pooling and load balancing can help.

## Common TCP Issues and How to Troubleshoot Them

### Packet Loss

Packet loss can occur due to network congestion or hardware issues. TCP will retransmit lost packets, but frequent packet loss can degrade performance. Use tools like `ping` or `traceroute` to diagnose network issues.

### Slow Performance

Slow performance can be caused by many factors, including high latency, low throughput, or network congestion. Use tools like `netstat` or `tcpdump` to analyze TCP connections and identify bottlenecks.


## Best Practices for Application Developers

### Use Persistent Connections

Persistent connections reduce the overhead of establishing and tearing down TCP connections. This can improve performance, especially for applications that make many small requests.

### Optimize Buffer Sizes

Adjusting the size of TCP buffers can improve performance. Larger buffers can increase throughput, while smaller buffers can reduce latency. Experiment with different buffer sizes to find the optimal configuration for your application.

### Monitor TCP Metrics

Monitoring TCP metrics like latency, throughput, and packet loss can help you identify performance issues. Use monitoring tools to track these metrics and make adjustments as needed.

### Handle Errors Gracefully

Even though TCP handles most errors automatically, your application should still handle errors gracefully. For example, if a connection is lost, your application should attempt to reconnect or notify the user.

### Test Under Realistic Conditions

Test your application under realistic network conditions to ensure it performs well. Use tools that simulate network latency, packet loss, and congestion to identify potential issues. Essentially, once you're trying to test the integration between multiple dependencies connecting via multiple protocols, consider testing in a production environment with [synthetic monitoring](https://www.checklyhq.com/blog/what-is-synthetic-monitoring/) rather than trying to simulate the scenario with mocks.

## TCP and HTTP
As mentioned above HTTP connections are application-level connections with TCP handling the network-layer connection. A few key concepts for those familiar with HTTP:
### 1. **Persistent Connections (HTTP Keep-Alive)**
   - By default, HTTP/1.1 uses **persistent connections**, meaning the same TCP connection can be reused for multiple HTTP requests and responses.
   - This reduces the overhead of establishing and closing TCP connections, improving performance.
   - The `Connection: keep-alive` header is used to enable persistent connections.

### 2. **Connection Pooling**
   - To further optimize performance, applications often use [**connection pooling**](https://node-postgres.com/features/pooling), where a pool of TCP connections is maintained and reused for multiple HTTP requests.
   - This is especially useful for applications that make many HTTP requests to the same server (e.g., APIs, microservices).

### 3. **Latency and the Three-Way Handshake**
   - The TCP three-way handshake introduces latency, especially for short-lived HTTP requests.
   - Techniques like **HTTP/2 multiplexing** and **HTTP/3** (which uses QUIC instead of TCP) can reduce this latency.
   - Applications using many many short lived requests (e.g. streaming a game to a browser) will want to switch from HTTP/1 connections.

### 4. **Error Handling**
   - TCP handles most network-level errors (e.g., packet loss, retransmission), but your application should still handle HTTP-level errors (e.g., `4xx` and `5xx` status codes).

### 5. **SSL/TLS and HTTPS**
   - When using HTTPS, the SSL/TLS handshake occurs after the TCP connection is established but before the HTTP request is sent.
   - This adds additional latency but ensures the connection is secure.

### 6. How HTTP/2 and HTTP/3 Change the Relationship

**HTTP/2**
   - HTTP/2 introduces **multiplexing**, allowing multiple HTTP requests and responses to be sent concurrently over a single TCP connection.
   - This reduces the need for multiple TCP connections and improves performance.
   - However, HTTP/2 still relies on TCP, so it inherits TCP’s limitations (e.g., head-of-line blocking).

**HTTP/3**
   - HTTP/3 replaces TCP with **QUIC**, a transport protocol built on UDP.
   - QUIC eliminates the three-way handshake, reduces latency, and handles packet loss more efficiently.
   - This makes HTTP/3 faster and more resilient, especially in high-latency or lossy networks.
   - Currently adoption of HTTP/3 is [growing with almost 30% of the market supporting](https://w3techs.com/technologies/details/ce-http3) HTTP/3 connections.

## Conclusion

While TCP is often considered the domain of network engineers, understanding its basics is crucial for application developers. By understanding how TCP works, you can optimize your application's performance, troubleshoot issues more effectively, and build more reliable applications. Remember to monitor TCP metrics, optimize buffer sizes, and handle errors gracefully to ensure your application performs well under all conditions.

## Additional Resources

- [**RFC 793**](https://www.rfc-editor.org/info/rfc793): The official specification for TCP.
- [**Wireshark**](https://www.wireshark.org/): A network protocol analyzer that can help you inspect TCP traffic.
- [**TCP/IP Illustrated, Volume 1**](http://www.kohala.com/start/tcpipiv1.html): A comprehensive book on TCP/IP protocols.

By following the best practices outlined in this document, you can ensure that your application leverages TCP effectively to deliver a reliable and high-performance user experience.