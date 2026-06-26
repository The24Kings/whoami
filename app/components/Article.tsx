import type { ReactNode } from 'react';

import './Article.css'

/** Wraps page/post content in the shared article layout. */
export function Article({ children }: { children: ReactNode }) {
    return (
        <div className="post">
            <div id="md-content">{children}</div>
        </div>
    );
}
