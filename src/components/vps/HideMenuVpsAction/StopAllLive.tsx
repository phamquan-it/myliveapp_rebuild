import { Button, Modal, Progress, message } from 'antd';
import React, { useState } from 'react';
import { blue, red } from '@ant-design/colors';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { VscDebugStart } from "react-icons/vsc";
import { webdockConfig } from '../../../../WEBDOCK_PROVIDER/APIRequest/config';
import axiosInstance from '@/apiClient/axiosConfig';
import { SignalFilled } from '@ant-design/icons';
interface StopAllLiveProps {
    vps: any
}

const StopAllLive: React.FC<StopAllLiveProps> = ({ vps }) => {

    const stopAllLiveVps = useMutation({
        mutationFn: (startData) => axiosInstance.post('/vps-provider/selected/stop-all-live', startData),
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
        <Button onClick={() => {
            setIsModalOpen(true)
        }} icon={<SignalFilled style={{
            color: 'red'
            }}/>}>Stop all live</Button>
        <Modal title="Stop all live" open={isModalOpen} onCancel={handleCancel} onOk={() => {
            const data = vps.map((vps: any) => ({ slug: vps.slug }))
            stopAllLiveVps.mutate(data)
        }}>
            <p>Stop all live from selected vps?</p>
        </Modal>
    </>
}

export default StopAllLive


