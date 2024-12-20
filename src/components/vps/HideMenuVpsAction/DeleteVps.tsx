import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled, StopFilled, StopOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';
interface DeleteVpsProps {
    selectedRowKeys: any
}

const DeleteVps: React.FC<DeleteVpsProps> = ({ selectedRowKeys }) => {
    console.log("Selected vps", selectedRowKeys)

    const deleteVps = useMutation({
        mutationFn: () => axiosInstance.delete('/vps-provider/delete', {
            params: { slugs: selectedRowKeys }
        }),
        onSuccess: () => {
            message.success("Success");
        },
        onError: (err) => {
            message.error('Error')
        }
    });

    const [isModalOpen, setIsModalOpen] = useState(false)

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return <>
        <Button icon={<DeleteFilled style={{
            color: 'red'
        }} />} onClick={() => {
            setIsModalOpen(true)
        }}>Delete vps</Button>
        <Modal title="Delte vps" open={isModalOpen} okButtonProps={{
            loading: deleteVps.isPending
        }} onCancel={handleCancel} onOk={() => {
            const data = selectedRowKeys.map((vps: any) => ({ slug: vps.slug }))
            deleteVps.mutate()
        }}>
            <p>Delete selected vps?</p>
        </Modal>
    </>
}

export default DeleteVps
