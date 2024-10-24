import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled, DeleteOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Popconfirm, PopconfirmProps, message } from 'antd';
import React from 'react';
interface DeletePlatformProps {
    id: number
}

const DeletePlatform: React.FC<DeletePlatformProps> = ({ id }) => {

    const { mutate, isPending } = useMutation({
        mutationKey: ['platform/delete' + id],
        mutationFn: () => axiosInstance.delete("/platform/delete/" + id),
        onSuccess: (res) => {
            message.success("OK")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        mutate()
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };



    return <>
        <Popconfirm
            title="Delete the task"
            description="Are you sure to delete this platform?"
            onConfirm={confirm}
            onCancel={cancel}
            okText="Yes"
            cancelText="No"
        >
            <Button danger type="primary" icon={<DeleteFilled />} loading={isPending}></Button>
        </Popconfirm>
    </>
}

export default DeletePlatform
