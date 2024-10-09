import axios from 'axios';
import { webdockConfig } from '../../../../WEBDOCK_PROVIDER/APIRequest/config';
import axiosInstance from '@/apiClient/axiosConfig';
import { Button, Modal, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { SyncOutlined } from '@ant-design/icons';
interface RestartVpsProps {
    vps: any
}

const RestartVps: React.FC<RestartVpsProps> = ({ vps }) => {

    const restartVps = useMutation({
        mutationFn: (startData) => axiosInstance.post('/vps-provider/selected/restart', startData),
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
        <Button icon={<SyncOutlined style={{
            color: '#4096ff'
            }}/>} onClick={() => {
            setIsModalOpen(true)
        }}>Restart vps</Button>
        <Modal title="Restart vps" open={isModalOpen} onCancel={handleCancel} onOk={() => {
            const data = vps.map((vps: any) => ({ slug: vps.slug }))
            restartVps.mutate(data)
        }}>
            <p>Restart selected vps?</p>
        </Modal>
    </>
}

export default RestartVps
