import { DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { Button, Modal, Table } from 'antd';
import Title from 'antd/es/typography/Title';
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '@/apiClient/axiosConfig';
import dayjs from 'dayjs';
interface EditLiveStreamsProps {
    activityStreamId: number
}

const EditLiveStreams: React.FC<EditLiveStreamsProps> = ({ activityStreamId }) => {


    const columns = [
        {
            title: 'No.',
            dataIndex: 'key',
            key: 'key',
            render:(text: string, record:any, index: number)=> index+1
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Start date',
            dataIndex: 'start_at',
            key: 'start_at',
            render: (text:string)=> dayjs(text).format('YYYY/MM/DD HH:mm:ss')
        },
        {
            title: 'End date',
            dataIndex: 'end_at',
            key: 'end_date',
            render: (text:string)=> dayjs(text).format('YYYY/MM/DD HH:mm:ss')
        },
        {
            title: 'Rest time',
            dataIndex: 'rest_time',
            key: 'rest_time',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
                    }
    ];

    const { data, isFetching } = useQuery({
        queryKey: ['cron', activityStreamId],
        queryFn: () => axiosInstance.get('/cron-stream/get-cron-from-stream-id',
            {
                params: {
                    language: 'en',
                    stream_id: activityStreamId
                }
            }
        )
    });

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    return <>
        <Button type="primary" icon={<EditFilled />} onClick={() => {
            setIsModalOpen(true);
        }}></Button>
        <Modal title="Cron" footer={[]} width={1000} open={isModalOpen} onCancel={handleCancel} destroyOnClose={true}>
            <Table dataSource={data?.data} loading={isFetching} columns={columns} />

        </Modal>
    </>

}

export default EditLiveStreams
