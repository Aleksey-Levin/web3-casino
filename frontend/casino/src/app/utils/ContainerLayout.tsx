import React from 'react';

type ContainerLayoutProps = {
    children: React.ReactNode;
};

const ContainerLayout: React.FC<ContainerLayoutProps> = ({ children }) => {
    return (
        <div className="flex bg-[#171A21]">
            <div className="container mx-auto relative py-6">
                {children}
            </div>
        </div>
    );
};

export default ContainerLayout;
