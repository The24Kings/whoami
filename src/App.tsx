import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Home, Layout, NoPage, NoPost, Post, Projects } from './pages'
import type { PostResp, SectionData } from './Types';

function loadGeneral(): SectionData {
  // loads raw string content of every .md file in src/markdown/
  const generalPosts = import.meta.glob<Omit<PostResp, 'slug'>>(
    './markdown/*.md',
    { eager: true, import: 'default' }
  );

  var posts = Object.entries(generalPosts).map(([path, data]) => ({
    slug: path.replace('./markdown/', ''),
    ...data,
    metadata: { tags: [], ...data.metadata },
  }))

  return {
    posts: [
      { slug: 'projects', metadata: { title: 'Projects', date: '', desc: '' }, body: '' },
      ...posts
    ],
    links: [
      { name: 'github', url: 'https://github.com/The24Kings' }
    ],
  };
}

function loadProjects(): SectionData {
  // loads raw string content of every .md file in src/markdown/projects/
  const projectsPosts = import.meta.glob<Omit<PostResp, 'slug'>>(
    './markdown/projects/*.md',
    { eager: true, import: 'default' }
  );

  var posts = Object.entries(projectsPosts).map(([path, data]) => ({
    slug: path.replace('./markdown/projects/', ''),
    ...data,
    metadata: { tags: [], ...data.metadata },
  }))

  return {
    posts: posts,
    links: [],
  };
}

const router = createBrowserRouter([
  {
    id: 'root',
    element: <Layout />,
    loader: () => loadGeneral(),
    children: [
      { index: true, element: <Home /> },
      {
        path: '/projects',
        id: 'projects',
        loader: () => loadProjects(),
        errorElement: <NoPost />,
        children: [
          { index: true, element: <Projects /> },
          { path: ':slug', element: <Post /> },
        ],
      },
      { path: ':slug', element: <Post /> },
      { path: '*', element: <NoPage /> },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}


export default App
