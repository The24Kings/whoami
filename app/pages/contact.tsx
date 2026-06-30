import type { MetaFunction } from 'react-router';
import { Article } from '../components';
import { findPostBySlug, postMeta, RouteId } from '../lib';

export const meta: MetaFunction = ({ matches }) => {
    const data = matches.find(m => m.id === RouteId.root)?.loaderData;
    return postMeta(findPostBySlug(data, 'contact.md'), 'Contact');
};

export default function Contact() {
    return (
        <Article>
            <h1>Contact</h1>
        </Article>
    );
}
