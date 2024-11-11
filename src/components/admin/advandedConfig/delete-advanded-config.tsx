import { AdvandedConfig } from '@/@type/AdvandedConfig';
import axiosInstance from '@/apiClient/axiosConfig';
import { useResolutionList } from '@/apiClient/providers/resolution';
import { DeleteFilled, EditFilled, PlusCircleFilled } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Form, FormProps, Input, Modal, Select, message } from 'antd';
import React, { useState } from 'react';
interface DeleteAdvandedConfigProps {
    id: number
}

export const DeleteAdvandedConfig: React.FC<DeleteAdvandedConfigProps> = ({ id }) => {
    const deletePath = `advanded-configuration/delete/${id}`
    const resolutionData = useResolutionList()
    const queryClient = useQueryClient()
    const deleteAdvandedConfig = useMutation({
        mutationKey: ['advandedConfig'],
        mutationFn: () => axiosInstance.delete(deletePath),
        onSuccess: (res) => {
            message.success("Success")
            setIsModalOpen(false)
            queryClient.invalidateQueries({
                queryKey: ['advanded-configuration']
            })
        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleOk = () => {
        deleteAdvandedConfig.mutate()
    }

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return <>
        <Button type="default" danger icon={<DeleteFilled />} iconPosition="end" onClick={() => {
            setIsModalOpen(true)
        }}></Button>
        <Modal title="Delete" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okButtonProps={{
            danger: true,
            loading: deleteAdvandedConfig.isPending
        }}
        >
            <p>Delete this config?</p>
        </Modal>
    </>
}
