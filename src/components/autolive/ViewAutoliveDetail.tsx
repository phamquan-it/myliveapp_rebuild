import { ActivityStream } from '@/@type/api_object';
import { EyeFilled } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import React, { useState } from 'react';
import { TbEyeStar } from 'react-icons/tb';
interface ViewAutoliveDetailProps {
    activityStream: ActivityStream
}

const ViewAutoliveDetail: React.FC<ViewAutoliveDetailProps> = ({ activityStream }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const dataSource = [
     activityStream 
    ];

    const columns = [
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            render: (text: any, record: ActivityStream)=> record?.user?.email,
        },
        {
            title: 'Platform',
            dataIndex: 'platform',
            key: 'platform',
            render: (text: any, record: ActivityStream) => record?.platform?.name,
        },
        {
            title: 'CreateAt',
            dataIndex: 'createAt',
            key: 'createAt',
        },
    ];

    return <>
        <Button type="default" icon={<EyeFilled />} onClick={()=>{
            setIsModalOpen(true);
        }}></Button>
        <Modal title="View details" footer={[]} open={isModalOpen} onCancel={handleCancel}>


            <Table dataSource={dataSource} columns={columns} pagination={false} />
        </Modal>
    </>
}

export default ViewAutoliveDetail
