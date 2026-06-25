import type { Config } from '@react-router/dev/config';
import { readdirSync } from 'node:fs';

const projectSlugs = readdirSync('app/markdown/projects')
    .filter(f => f.endsWith('.md'));

const generalSlugs = readdirSync('app/markdown')
    .filter(f => f.endsWith('.md'));

export default {
    ssr: false,
    prerender: [
        '/',
        '/projects',
        ...projectSlugs.map(s => `/projects/${s}`),
        ...generalSlugs.map(s => `/${s}`),
    ],
} satisfies Config;
