import { createClient } from '$lib/prismicio';

export const prerender = true;

const STATIC_ROUTES = ['/', '/about', '/facility', '/reserve', '/contact'];

export async function GET({ url, fetch }) {
	const client = createClient({ fetch });

	let dynamicRoutes: string[] = [];
	try {
		const pages = await client.getAllByType('page');
		dynamicRoutes = pages.map((p) => `/${p.uid}`);
	} catch {
		// no pages yet — that's fine
	}

	const allRoutes = [...STATIC_ROUTES, ...dynamicRoutes];

	const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
	.map(
		(path) => `	<url>
		<loc>${url.origin}${path}</loc>
		<changefreq>monthly</changefreq>
	</url>`
	)
	.join('\n')}
</urlset>`;

	return new Response(xml, {
		headers: {
			'Content-Type': 'application/xml'
		}
	});
}
