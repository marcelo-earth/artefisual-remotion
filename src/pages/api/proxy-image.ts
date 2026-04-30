import type { APIRoute } from 'astro';

export const GET: APIRoute = async ({ url }) => {
  const imageUrl = url.searchParams.get('url');
  if (!imageUrl) {
    return new Response('Missing url param', { status: 400 });
  }

  let parsed: URL;
  try {
    parsed = new URL(imageUrl);
  } catch {
    return new Response('Invalid URL', { status: 400 });
  }

  const allowed =
    parsed.hostname.endsWith('.mzstatic.com') || parsed.hostname.endsWith('.apple.com');
  if (!allowed) {
    return new Response('Forbidden', { status: 403 });
  }

  const res = await fetch(imageUrl);
  const buffer = await res.arrayBuffer();

  return new Response(buffer, {
    headers: {
      'Content-Type': res.headers.get('content-type') || 'image/jpeg',
      'Cache-Control': 'public, s-maxage=86400',
      'Access-Control-Allow-Origin': '*',
    },
  });
};
