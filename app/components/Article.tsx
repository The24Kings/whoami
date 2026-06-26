import type { ReactNode } from 'react';

import './Article.css'

interface ArticleProps {
    children: ReactNode;
}

/** Wraps page/post content in the shared article layout. */
export const Article = ({ children }: ArticleProps) => {
    return (
        <div className="post" >
            <div id="md-content">{children}</div>
        </div >
    );
}
