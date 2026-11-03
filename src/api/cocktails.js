import { z } from 'zod';
import { cocktails } from './_data/cocktails.js';

const Query = z.object({
    category: z.enum(['classic', 'signature', 'mocktail']).optional(),
});

export default function handler(req, res) {
    if (req.method !== 'GET') {
        res.setHeader('Allow', 'GET');
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const parsed = Query.safeParse(req.query);
    if (!parsed.success) {
        return res.status(400).json({ error: 'Invalid query' });
    }

    const { category } = parsed.data;
    const list = category ? cocktails.filter((c) => c.category === category) : cocktails;

    res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
    res.status(200).json(list);

}// import { z } from 'zod';


// import { cocktails } from './_data/cocktails.js';
//
// const Query = z.object({
//     category: z.enum(['classic', 'signature', 'mocktail']).optional(),
// });
//
// export default function handler(req, res) {
//     if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });
//
//     const parsed = Query.safeParse(req.query);
//     if (!parsed.success) return res.status(400).json({ error: 'Invalid query' });
//
//     const { category } = parsed.data;
//     const list = category ? cocktails.filter((c) => c.category === category) : cocktails;
//
//     res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate=86400');
//     res.status(200).json(list);
// }