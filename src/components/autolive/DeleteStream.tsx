import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
interface DeleteStreamProps {
    id: number;
}

const DeleteStream: React.FC<DeleteStreamProps> = ({ id }) => {
    const queryClient = useQueryClient()
    const [isModalOpen, setIsModalOpen] = useState(false)

    const deleteMutation = useMutation({
        mutationKey: ['stream'],
        mutationFn: () => axiosInstance.delete("/activity-stream/delete/" + id),
        onSuccess: () => {

            message.success("Ok")
            queryClient.invalidateQueries({ queryKey: ['activityStream'] })
        },
        onError: () => {
            message.error("No ok");
        }
    })
    const handleCancel = () => {
        setIsModalOpen(false);
    }

    const showModal = () => {
        setIsModalOpen(true);
    }
    return <>
        <Button type="primary" danger icon={<DeleteFilled />} onClick={showModal}></Button>
        <Modal title="Delete" open={isModalOpen} onCancel={handleCancel}>
            <p>Delete this stream, you cant restore?</p>
        </Modal>

    </>;
}

export default DeleteStream
