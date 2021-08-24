---
title: Monitoring local environments
weight: 7
menu:
  docs:
    parent: "Monitoring"
---

Checkly allows you to check your publicly accessible websites and APIs. However, by default Checkly won't have access to sites that aren't publicly available (for instance localhost). 

With [ngrok](https://ngrok.com/) you can secure a tunnel to your localhost, so you can run checks on your internal sites directly, without the need of deploying every change.

Here 

1. Go to [https://ngrok.com/](https://ngrok.com/) and create an account. 
2. Download Ngrok, install it and get it started [https://dashboard.ngrok.com/get-started/setup](https://dashboard.ngrok.com/get-started/setup)
3. Say you want to run checks on [http://localhost:80](http://localhost:80), you'll need expose port 80, with the command `./ngrok http 80`, or `ngrok http 80` if you extracted ngrok on your system's $PATH.
4. You'll get a screen similar to this.
![ngrok](/docs/images/monitoring/ngrok.png)
5. Then you can use the "forwarding" URL in Checkly.
![script](/docs/images/monitoring/script.png)

6. The check will reach successfully your localhost and ngrok will show successful HTTP requests.
![ngrok200](/docs/images/monitoring/ngrok200.png)

## Ngrok UI feature to inspect requests

If you navigate to the Web Interface URL returned in the terminal by ngrok (in the case shown above `http://127.0.0.1:4040/`), you will be able to inspect requests.
![ui feature](/docs/images/monitoring/ui-feature.png)

## Free version limitations

The free version allows to proxy connections only for one hour, then you need to manually restart ngrok, the proxy address will change and you will have to manually update the Checkly check with the new address.

Such limitation doesn't exist with the paid version.

{{< info >}}
This is a v1 documentation. We are working on providing documentation on how to setup ngrok so it runs on a permanent basis. 
{{< /info >}}