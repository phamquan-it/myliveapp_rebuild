import { PlusCircleFilled } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
interface EditLiveStreamsProps {

}

const EditLiveStreams: React.FC<EditLiveStreamsProps> = () => {

    const dataSource = [
        {
            key: '1',
            name: 'Mike',
            age: 32,
            address: '10 Downing Street',
        },
        {
            key: '2',
            name: 'John',
            age: 42,
            address: '10 Downing Street',
        },
    ];

    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start date',
            dataIndex: 'start_date',
            key: 'start_date',
        },
        {
            title: 'End date',
            dataIndex: 'end_date',
            key: 'end_date',
        },
        {
            title: 'Rest time',
            dataIndex: 'rest_time',
            key: 'rest_time',
        },
    ];

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return <>
        <Button type="primary" icon={<PlusCircleFilled />} onClick={()=>{
            setIsModalOpen(true);
        }}></Button>
        <Modal title="Edit" open={isModalOpen} onCancel={handleCancel}>
            <Title level={2}>Cron</Title>
            <Table dataSource={dataSource} columns={columns} />
        </Modal>
    </>

}

export default EditLiveStreams
