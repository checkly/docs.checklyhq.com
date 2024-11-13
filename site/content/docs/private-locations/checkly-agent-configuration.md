---
title: Checkly Agent Configuration - Checkly Docs
displayTitle: Checkly Agent Configuration
navTitle: Checkly Agent Configuration
weight: 52
menu:
  resources:
    parent: "Private Locations"
aliases:
- "/docs/private-locations/checkly-agent-guide/"
cli: true
---

The Checkly Agent is a container that you need to deploy to run a Private Location in Checkly. The agent needs to be deployed on your infrastructure and executes checks on behalf of the Checkly application. For installation details, [check the getting started guide](/docs/private-locations/).

The Checkly Agent has several environment variables that can be configured:

Variable|Description
---|---
`API_KEY`|API key for the Private Location in which the agent will serve. The API key is shown in the web app once, when initially creating a Private Location.
`HTTPS_PROXY`|HTTPS proxy configuration for the outbound connection to the Checkly API, used for agent management and monitoring. `https://user:password@127.0.0.1:8080`
`HTTP_PROXY`|HTTP proxy configuration for the outbound connection to the Checkly API, used for agent management and monitoring. Used if the proxy server does not accept HTTPS connections. `http://user:password@127.0.0.1:8080`
`JOB_CONCURRENCY`|(Default: 1, max: 10) Number of concurrent checks that are run by the agent.
`LOG_LEVEL`|(Default: `INFO`) Set the log level of the agent. Can be one of `DEBUG`, `LOG`, `INFO`, `WARN` or `ERROR`.

For example, you can add these variables to the standard docker run command like this:

```bash
docker run -e API_KEY="pl_...." -d checkly/agent:latest
```

Here are some more usage examples:

1. Set the `JOB_CONCURRENCY` to the appropriate value (1-10) based on your scaling calculations:

```bash
-e JOB_CONCURRENCY=10
```

2. Configure an HTTPS or HTTP proxy if one is required for your environment:

```bash
-e HTTPS_PROXY="https://user:password@127.0.0.1:8080"`
```

Once the agent container is running, you can see it in a running state using the appropriate command from your container engine (typically `docker ps`).

```bash
CONTAINER ID   IMAGE                  COMMAND           CREATED       STATUS       PORTS     NAMES
72ec5591f6b2   checkly/agent:latest   "node index.js"   5 hours ago   Up 5 hours             lucid_shockley
```

5. You can also check the logs of the new container to ensure it's up and running (typically `docker logs <container_name>`).

 ```bash
 [checkly-agent] Starting Consumer c7495186-6f1e-4526-b173-14ee9ad21775
 [checkly-agent] No jobs. Waiting..
 [checkly-agent] No jobs. Waiting..
 [checkly-agent] No jobs. Waiting..
 [checkly-agent] No jobs. Waiting..
 [checkly-agent] No jobs. Waiting..
 ```

## Local Docker workflow

You can easily install the Checkly Agent on your Macbook, Windows or Linux machine for local debugging using [Docker Desktop](https://docs.docker.com/desktop/). The installation procedure is the same as described above.

To resolve locally running webapps or APIs, e.g. some project running on `http://localhost:3000` you need to use the [internal
Docker host](https://docs.docker.com/desktop/networking/) `http://host.docker.internal:3000` to bridge to your `localhost` address.

## Updating the agent container

New versions of the Checkly Agent are released regularly. To have access to the latest improvements, you can update the Checkly Agent containers.

### Manual updates

To manually uprade your Checkly Agent containers, first pull the image:

```bash
docker pull checkly/agent:latest
```

You can then start a new Checkly Agent using the updated image. If you no longer have the API key, you can always create a new one in the UI by [rotating API keys](#rotating-api-keys).

```bash
docker run -e API_KEY="pl_...." -d checkly/agent:latest
```

Finally, you can clean up old Checkly Agent containers. First, run `docker ps` to find the names of the previous Agent containers.

```bash
CONTAINER ID   IMAGE                  COMMAND           CREATED       STATUS       PORTS     NAMES
72ec5591f6b2   checkly/agent:latest   "node index.js"   5 hours ago   Up 5 hours             lucid_shockley
db0aa54baf78   checkly/agent:latest   "node index.js"   6 days ago    Up 5 hours             quirky_lumiere
```

You can distinguish the old containers from the new ones by looking at the `CREATED` field. Then run `docker stop <old container name>` and `docker rm <old container name>` to remove the old Agent containers.

### Automatic updates

{{< info >}}
Use caution when enabling automatic updates in production. This could automatically update to a version with breaking changes, and upgrade to an agent version supporting a later runtime.
{{< /info >}}

Since the agent is stateless, it can also be updated by replacing or updating the image in place.
If you don't have an existing process for upgrading containers, an in-place upgrade is easiest as it keeps the previously defined environment variables.

Breaking changes are communicated by increasing the major version of the image (e.g. from v1.3.8 to v2.0.0). Each version of the agent only supports a single runtime. You can find a list of agent versions and corresponding runtimes [below](/docs/private-locations/checkly-agent-configuration/#agent-version-and-runtimes).

You can use the [Watchtower tool](https://containrrr.dev/watchtower/) to do an in-place upgrade of an agent container. Ensure you have sufficient agent capacity as the agent container will have a short outage as it is upgraded. As agent shutdowns are graceful, no running checks will be lost:

```bash
docker run --rm -v /var/run/docker.sock:/var/run/docker.sock containrrr/watchtower --run-once <container-name-to-be-updated>
```

## Rotating API keys

API keys can be rotated as necessary in order to maintain good security practices or in case a key is lost or compromised. A Private Location can have two active API keys. To rotate the API keys:

1. Navigate to Private Locations in your Account Settings.
2. Click the edit icon on the Private Location you want to update.
3. There will only be a single API key in place on a new Private Location. Click Add new API key to add the second key.
4. The new API key will appear. Click the copy icon to copy it to your clipboard and save it somewhere secure.

   ![new key](/docs/images/private-locations/new_key.png)

5. Click Save to close the dialog. You can now see the trailing characters of the two defined API keys in the list of Private Locations.

   ![two keys](/docs/images/private-locations/two_keys.png)

6. You now need to replace your Checkly agents. You can do this one-by-one or as a group, just make sure you always have enough agent containers up and running based on your workload. Using your container management tool, start new agents with the new API key:

```bash
docker run -e API_KEY="pl_...." -d checkly/agent:latest`
```

7. Make sure the new agents are running properly. You can check the agent count on the Private Locations page, or check your container logs. Remove the old agent containers:

```bash
docker stop <old container name or ID>`
```

If you lose track of which agent containers are using the old API key, you can use the `docker inspect <container name or ID>` command and look for the `API_KEY` variable in the output.

8. Now that your new agents are in place, remove the old API key. Click the edit icon in the Private Location again.
9. Click the delete icon next to the old API key (verified by the shown trailing characters) then click the confirmation.
10. Click Save to close the dialog. You will now only see the new API key listed for the Private Location.

## Trusting Enterprise TLS Certificates

Some enterprise environments may use internal certificates for TLS connections. These certificates need to be trusted by the agent; otherwise, the agent's TLS connection to the Checkly platform will fail.

To configure the agent to trust the certificate, first copy the certificate as a PEM file onto the host. The Docker run command should then be updated to mount the certificate as a volume and pass the path to the certificate in the `NODE_EXTRA_CA_CERTS` environment variable. For a certificate stored at the path `~/certificate.pem`, the Docker run command will be:

```bash
docker run -v ~/certificate.pem:/checkly/certificate.pem -e NODE_EXTRA_CA_CERTS=/checkly/certificate.pem -e API_KEY="pl_...." -d checkly/agent:latest
```

## Agent Version and Runtimes
Each Checkly Agent only supports a single [runtime](/docs/runtimes/). This is to keep the container image at an acceptable size. When you change the runtime a check uses, you also need to change to the corresponding agent version. Similarly, if you update the agent version to one using a different runtime you also need to update your checks to use the same runtime.

| Runtime | Agent version |
|---------|---------------|
| 2024.09 | 4.0.0         |
| 2024.02 | 3.4.0         |
| 2023.09 | 3.2.0         |
| 2023.02 | 2.0.0         |
| 2022.10 | 1.3.9         |

As each agent version only supports a single runtime we recommend pinning agent versions used in production.

## Troubleshooting

If you're using a self-signed certificate for your proxy, the Agent's HTTP client will not trust it by default. There are two ways to fix this.

1. Add your Certificate Authority's (CA) root certificate to the system's CA store. On Debian, and related Linux distributions, you can do this by copying your `*.crt` certificate to `/usr/local/share/ca-certificates/` and running `sudo update-ca-certificates`.
2. Alternatively, you can tell the node process in the Agent's container to accept unauthorized certificates with the following environment variable, `NODE_TLS_REJECT_UNAUTHORIZED=0`. This can be appended to your `docker run ..` command with the `-e` flag.
