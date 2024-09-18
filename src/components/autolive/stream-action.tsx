import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled, DeleteOutlined, DesktopOutlined, StopOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps, message } from 'antd';
import { ConfigProvider } from 'antd/lib';
import React from 'react';
import { TbLetterYSmall } from 'react-icons/tb';
interface StreamActionProps {
    personStream: any,
    reloadData: () => void
}

const StreamAction: React.FC<StreamActionProps> = ({ personStream, reloadData }) => {
    const stopLive = useMutation({
        mutationKey: ['stoplive'],
        mutationFn: (data: any) => axiosInstance.post('/autolive-control/stop-live', data),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    return (
        <div className='flex gap-1'>
            <Button type="primary" className='bg-green-500' icon={<DesktopOutlined />}></Button>
            <Button type="default" icon={<StopOutlined style={{
                color: 'red'
            }} />} onClick={() => {
                const streamData = {
                    stream_id: personStream
                }
                stopLive.mutate(streamData)
            }}></Button>
            <Button type="primary" danger icon={<DeleteFilled />}></Button>
        </div>
    )
}

export default StreamAction
