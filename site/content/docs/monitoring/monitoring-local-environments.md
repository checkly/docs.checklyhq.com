---
title: Monitoring local environments with ngrok 
weight: 7
menu:
  docs:
    parent: "Monitoring"
    title: Local environments
---

Checkly allows you to check your publicly accessible websites and APIs. However, by default Checkly won't have access to sites that aren't publicly available (for instance localhost). 

With <a href="https://ngrok.com/" target="_blank">ngrok</a> you can secure a tunnel to your localhost, so you can run checks on your internal sites directly, without the need to deploy every change.

1. Go to <a href="https://ngrok.com/" target="_blank">ngrok's site</a> and create an account. 
2. Download Ngrok, install it and <a href="https://dashboard.ngrok.com/get-started/setup" target="_blank">get it started</a>.
3. Say you want to run checks on <a href="http://localhost:3000" target="_blank">http://localhost:3000</a>, you'll need expose port 3000, with the command `./ngrok http 3000`, or `ngrok http 3000` if you extracted ngrok on your system's $PATH.
4. You'll get a screen similar to this.
![ngrok screen](/docs/images/monitoring/ngrok.png)
5. Then you can use the "forwarding" URL in Checkly.
![script including ngrok URL](/docs/images/monitoring/script.png)

6. The check will successfully reach your localhost and ngrok will show successful HTTP requests.
![ngrok 200 http requests](/docs/images/monitoring/ngrok200.png)

## Ngrok UI feature to inspect requests

If you navigate to the Web Interface URL returned in the terminal by ngrok (in the case shown above `http://127.0.0.1:4040/`), you will be able to inspect requests.
![ngrok ui feature](/docs/images/monitoring/ui-feature.png)

## Known limitations

The free version of ngrok allows to proxy connections only for one hour, then you need to manually restart ngrok, the proxy address will change and you will have to manually update the Checkly check with the new address.

Such limitation doesn't exist with the paid version.

{{< info >}}
This is v1 documentation. We are working on providing documentation on how to setup ngrok so it runs on a permanent basis. 
{{< /info >}}
