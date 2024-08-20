import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
interface DeleteCronProps {
    activityStreamId: number
}

const DeleteCron: React.FC<DeleteCronProps> = ({ activityStreamId }) => {
    console.log('streamid', activityStreamId)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false);
    }
    const { mutate, isPending } = useMutation({
        mutationKey: ['delete'],
        mutationFn: () => axiosInstance.delete(`/cron-stream/delete/${activityStreamId}`),
        onSuccess: (res: any)=>{
            message.success("success");
        },
        onError: (error: any)=>{
            message.error(error.message)
        }
    })


    return <>
        <Button type="primary" size="small" danger icon={<DeleteFilled/>} onClick={()=>{
            setIsModalOpen(true)
        }}></Button>
        <Modal title="Delete" open={isModalOpen} okButtonProps={{
            style: { backgroundColor: 'red' }
            }} onCancel={handleCancel} onOk={()=> {
                mutate();
            }}>
            <p>Are you sure?</p>


        </Modal>
    </>
}

export default DeleteCron
