import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
interface DeleteStreamProps {
    id: number;
}

const DeleteStream: React.FC<DeleteStreamProps> = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    
    const deleteMutation = useMutation({
        mutationKey: ['stream'],
        mutationFn: ()=> axiosInstance.delete("/"),
        onSuccess: ()=>{
            message.success("Ok")
        },
        onError: ()=> {
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
              <p>Delete this stream, you can't restore?</p>
        </Modal>

    </>;
}

export default DeleteStream
