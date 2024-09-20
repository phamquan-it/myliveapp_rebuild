import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled, DeleteOutlined, DesktopOutlined, StopOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps, Popconfirm, PopconfirmProps, Tooltip, message } from 'antd';
import { ConfigProvider } from 'antd/lib';
import React from 'react';
import { TbLetterYSmall } from 'react-icons/tb';
interface StreamActionProps {
    personStream: any,
    reloadData: () => void
    status: string
}

const StreamAction: React.FC<StreamActionProps> = ({ personStream, reloadData, status }) => {

    console.log(status)
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

    const confirm: PopconfirmProps['onConfirm'] = (e) => {

        const streamData = {
            stream_id: personStream
        }
        stopLive.mutate(streamData)
    };

    const confirmStart: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const confirmDelete: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };

    return (
        <div className='flex gap-3'>

            <Tooltip title="Start stream">
                <Popconfirm
                    title="Start"
                    description="Are you sure start this stream?"
                    onConfirm={confirmStart}
                    okText="Yes"
                    cancelText="No"
                    icon={<DesktopOutlined style={{
                        color: 'green'
                    }} />}
                >
                    <Button className='bg-green-500' type='primary' icon={<DesktopOutlined />}></Button>
                </Popconfirm>
            </Tooltip>

            <Tooltip title="Stop stream">
                <Popconfirm
                    title="Stop stream"
                    description="Are you sure stop this stream?"
                    onConfirm={confirm}
                    okText="Yes"
                    cancelText="No"
                    icon={<StopOutlined style={{ color: 'red' }} />}
                >
                    <Button type="default" disabled={status != 'running'} icon={<StopOutlined style={{
                        color: 'red'
                    }} />} ></Button>

                </Popconfirm>

            </Tooltip>
            <Tooltip title="Delete stream">

                <Popconfirm
                    title="Delete stream"
                    description="Are you sure to delete this stream?"
                    onConfirm={confirmDelete}
                    okText="Yes"
                    cancelText="No"
                    icon={<DeleteFilled style={{ color: 'red' }} />}
                >
                    <Button type="primary" danger icon={<DeleteFilled />}></Button>
                </Popconfirm>
            </Tooltip>
        </div>
    )
}

export default StreamAction
