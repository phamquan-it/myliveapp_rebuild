import { Button, Modal, Progress, message } from 'antd';
import React, { useState } from 'react';
import { blue, red } from '@ant-design/colors';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { VscDebugStart } from "react-icons/vsc";
import { webdockConfig } from '../../../../WEBDOCK_PROVIDER/APIRequest/config';
import axiosInstance from '@/apiClient/axiosConfig';
interface StartVpsProps {
    vps: any
}

const StartVps: React.FC<StartVpsProps> = ({ vps }) => {

    const startVps = useMutation({
        mutationFn: (startData) => axiosInstance.post('/vps-provider/selected/start', startData),
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
        <Button type="primary" onClick={() => {
            setIsModalOpen(true)
        }} icon={<VscDebugStart />}>Start vps</Button>
        <Modal title="Start vps" open={isModalOpen} onCancel={handleCancel} onOk={() => {
            const data = vps.map((vps: any) => ({ slug: vps.slug }))
            startVps.mutate(data)
        }}>
            <p>Start selected vps?</p>
        </Modal>
    </>
}

export default StartVps


