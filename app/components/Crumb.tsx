import React from 'react';

import './Crumb.css'

export type CrumbVariants = 'folder' | 'file';

export interface CrumbData {
    name: string;
    variant?: CrumbVariants;
    onClick?: () => void;
    current?: boolean;
}

export const Crumb: React.FC<CrumbData> = ({
    variant = 'folder',
    name,
    onClick,
    current = false,
}) => {
    return (
        <span>
            <button
                type="button"
                className={`crumb crumb-${variant}`}
                aria-current={current ? 'page' : undefined}
                onClick={onClick}
            >
                {name}
            </button>
            {variant === 'folder' && '/'}
        </span>
    )
};
