import axios from 'axios';
import { webdockConfig } from '../../../../WEBDOCK_PROVIDER/APIRequest/config';
import axiosInstance from '@/apiClient/axiosConfig';
import { Button, Modal, message } from 'antd';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { StopFilled, StopOutlined } from '@ant-design/icons';
interface StopVpsProps {
    vps: any
}

const StopVps: React.FC<StopVpsProps> = ({ vps }) => {

    const startVps = useMutation({
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
        <Button icon={<StopOutlined style={{
            color: 'red'
            }}/>} onClick={() => {
            setIsModalOpen(true)
        }}>Stop vps</Button>
        <Modal title="Stop vps" open={isModalOpen} onCancel={handleCancel} onOk={() => {
            const data = vps.map((vps: any) => ({ slug: vps.slug }))
            startVps.mutate(data)
        }}>
            <p>Stop selected vps?</p>
        </Modal>
    </>
}

export default StopVps
