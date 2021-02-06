# sentry-discord

Cloudflare worker function to send [sentry.io](https://sentry.io) alerts to [Discord](https://discord.com).

## Deployment

1. [create a new Cloudflare worker](https://workers.cloudflare.com)
2. copy and paste the contents of `index.js` into the *quick edit* editor, **save and deploy**
3. open the Cloudflare Workers *settings* page and add a new **Environment Variable**

Use `WEBHOOK` for the `VARIABLE_NAME` and the generated Discord webhook URL for the `Value`

4. now configure sentry to send events to your workers script, for example: `https://super-worker.awesomesauce.workers.dev/`
