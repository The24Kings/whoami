import { Link } from 'react-router';
import { Article } from '../components';

// Rendered by post.tsx when a top-level page/slug doesn't exist.
export default function NoPost() {
    return (
        <Article>
            <h1 className="error">Post Not Found</h1>
            <p><Link to="/projects">Back to projects</Link></p>
        </Article>
    );
}
