import React from 'react';

export type CrumbVariants = 'folder' | 'file';

export interface CrumbData {
    name: string;
    variant?: CrumbVariants;
    onClick?: () => void;
}

export const Crumb: React.FC<CrumbData> = ({
    variant = 'folder',
    name,
    onClick,
}) => {
    return (
        <>
            <span>
                <a className="crumb" id={variant} onClick={onClick}>
                    {name}
                </a>
                {variant === 'folder' && '/'}
            </span>
        </>
    )
};
