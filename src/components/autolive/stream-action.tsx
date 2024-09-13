import { Button, Dropdown, MenuProps } from 'antd';
import React from 'react';
interface StreamActionProps {
    personStream: any
}

const StreamAction: React.FC<StreamActionProps> = () => {
    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <a rel="noopener noreferrer" href="https://www.antgroup.com">
                    Start now
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a rel="noopener noreferrer" href="https://www.aliyun.com">
                    Stop stream
                </a>
            ),
        },
        {
            key: '3',
            label: (
                <a rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    Delete stream
                </a>
            ),
        },
    ];
    return (
        <>


            <Dropdown menu={{ items }} placement="bottomLeft" trigger={['click']}>
                <Button>...</Button>
            </Dropdown>
        </>
    )
}

export default StreamAction
