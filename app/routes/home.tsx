import type { MetaFunction } from 'react-router';
import './post.css';

export const meta: MetaFunction = () => [
    { title: 'The24Kings@portfolio: ~ _>' },
];

export default function Home() {
    return (
        <div className="post">
            <h1>Welcome</h1>
        </div>
    );
}
