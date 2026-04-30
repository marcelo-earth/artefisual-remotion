import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const action = url.searchParams.get('action');
  let itunesUrl: URL;

  if (action === 'search') {
    itunesUrl = new URL('https://itunes.apple.com/search');
  } else if (action === 'lookup') {
    itunesUrl = new URL('https://itunes.apple.com/lookup');
  } else {
    return new Response(JSON.stringify({ error: 'Invalid action' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  url.searchParams.forEach((value, key) => {
    if (key !== 'action') itunesUrl.searchParams.set(key, value);
  });

  try {
    const res = await fetch(itunesUrl.toString());
    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, s-maxage=300',
      },
    });
  } catch {
    return new Response(JSON.stringify({ error: 'iTunes API error' }), {
      status: 502,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
