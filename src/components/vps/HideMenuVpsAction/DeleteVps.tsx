import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled, StopFilled, StopOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Modal, message } from 'antd';
import { useState } from 'react';
interface DeleteVpsProps {
    vps: any
}

const DeleteVps: React.FC<DeleteVpsProps> = ({ vps }) => {

    const deleteVps = useMutation({
        mutationFn: (startData) => axiosInstance.post('/vps-provider/selected/stop', startData),
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
            }}/>} onClick={() => {
            setIsModalOpen(true)
        }}>Delete vps</Button>
        <Modal title="Stop vps" open={isModalOpen} onCancel={handleCancel} onOk={() => {
            const data = vps.map((vps: any) => ({ slug: vps.slug }))
            deleteVps.mutate(data)
        }}>
            <p>Delete selected vps?</p>
        </Modal>
    </>
}

export default DeleteVps
