const COLORS = {
    debug: parseInt('fbe14f', 16),
    info: parseInt('2788ce', 16),
    warning: parseInt('f18500', 16),
    error: parseInt('e03e2f', 16),
    fatal: parseInt('d20f2a', 16),
};

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    const body = await request.json();
    console.log(body)
    const payload = {
        username: 'Sentry',
        content: body.content,
        avatar_url: `https://raw.githubusercontent.com/pew/cloudflare-worker-sentry-discord/master/sentry-icon.png`,
        embeds: [{
            title: body.project_name,
            type: 'rich',
            description: body.message,
            url: body.url,
            timestamp: new Date(body.event.received * 1000).toISOString(),
            color: COLORS[body.level] || COLORS.error,
            footer: {
                icon_url: 'https://github.com/fluidicon.png',
                text: 'pew/cloudflare-worker-sentry-discord',
            },
            fields: [],
        }, ],
    };

    if (body.event.user) {
        payload.embeds[0].fields.push({
            name: '**User**',
            value: body.event.user.username,
        });
    }

    if (body.event.tags) {
        body.event.tags.forEach(([key, value]) => {
            payload.embeds[0].fields.push({
                name: key,
                value,
                inline: true,
            });
        });
    }
    const req = fetch(WEBHOOK, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    await req;
    return new Response('', {
        status: 200
    })
}
