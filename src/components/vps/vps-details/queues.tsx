import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { Button, Table, Tooltip } from 'antd';
import React from 'react';
interface QueuesProps{
    data: any 
}

const Queues:React.FC<QueuesProps> = ({data}) => {

        const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'key',
        },
        {
            title: 'Mission',
            dataIndex: 'name',
            key: 'name',
            render: (text: string, record: any) => (<>
                {record?.mission.name}
            </>)
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (id: string) => (
                <div className="flex gap-1">
                    <Tooltip title="View detail">
                        <Button type="default" size="small" icon={<EyeFilled />} onClick={handleOpenModal}></Button>
                    </Tooltip>
                    <Tooltip title="Remove from queue">
                        <Button type="default" size="small" icon={<DeleteFilled />} danger></Button>
                    </Tooltip>

                </div>
            )
        },
    ];

    return <>
        
        <Table dataSource={data} columns={columns} />;	
    </>
}

export default Queues
function handleOpenModal(): void {
    throw new Error('Function not implemented.');
}

