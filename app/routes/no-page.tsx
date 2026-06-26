import { Link } from 'react-router';
import type { MetaFunction } from 'react-router';
import './post.css';

export const meta: MetaFunction = () => [
    { title: 'Not found | The24Kings@portfolio' },
];

export default function NoPage() {
    return (
        <div className="post">
            <h1 className="error">Sorry this page does not exist!</h1>
            <p><Link to="/">Return home</Link></p>
        </div>
    );
};
