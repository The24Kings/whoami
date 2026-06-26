import { type RouteConfig, route, index } from '@react-router/dev/routes';

export default [
    index('pages/Home.tsx'),
    route('projects', 'routes/projects.tsx', [
        index('pages/Projects.tsx'),
        route(':slug', 'routes/post.tsx'),
    ]),
    route(':slug', 'routes/page.tsx'),
] satisfies RouteConfig;
