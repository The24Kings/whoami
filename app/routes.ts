import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
    index('routes/home.tsx'),
    route('projects', 'routes/projects.tsx', [
        index('routes/projects-index.tsx'),
        route(':slug', 'routes/post.tsx'),
    ]),
    route(':slug', 'routes/page.tsx'),
] satisfies RouteConfig;
