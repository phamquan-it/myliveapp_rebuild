import React, { ReactNode } from 'react';
interface HorizoneMenuProps {
    data: any[]
    children: ReactNode | string
}

const HorizoneMenu: React.FC<HorizoneMenuProps> = ({ children, data }) => {
    return (
        <div
            className={`border-b transition-opacity duration-150 ${data.length === 0 ? 'opacity-0' : 'opacity-100'
                }`}
        >
            {children}
        </div>
    )
}

export default HorizoneMenu
