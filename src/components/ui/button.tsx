import { Button, ButtonProps } from 'antd';
import React, { ReactNode } from 'react';
interface IconButtonProps extends ButtonProps {

    children: ReactNode
}

const IconButton: React.FC<IconButtonProps> = (props) => {
    return <>
        <Button type="primary" {...props} icon={<>
            {props.children}
        </>}></Button>
    </>
}

export default IconButton
