import React from 'react';

type ContainerLayoutProps = {
    children: React.ReactNode;
    className?: string;
};

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children, className }) => {
    return (
        <div className={`flex bg-[#171A21] ${className}`}>
            <div className="container mx-auto relative py-6 min-h-[100dvh]">
                {children}
            </div>
        </div>
    );
};

export default ContainerLayout;
