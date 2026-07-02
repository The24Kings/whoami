import type { MetaFunction } from 'react-router';
import { Article } from '../components';

export const meta: MetaFunction = () => [
    { title: 'The24Kings@portfolio' },
];

export default function Home() {
    return (
        <Article>
            <h1>Welcome</h1>
        </Article>
    );
}
