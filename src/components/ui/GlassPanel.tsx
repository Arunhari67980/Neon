import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface GlassPanelProps {
    children: React.ReactNode;
    className?: string;
}

export const GlassPanel = ({ children, className }: GlassPanelProps) => {
    return (
        <div className={cn(
            "glass-panel rounded-2xl",
            className
        )}>
            {children}
        </div>
    );
};
