import axiosInstance from '@/apiClient/axiosConfig';
import { DeleteFilled, DeleteOutlined, DesktopOutlined, StopOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Dropdown, MenuProps, Popconfirm, PopconfirmProps, Tooltip, message } from 'antd';
import { ConfigProvider } from 'antd/lib';
import { useTranslations } from 'next-intl';
import React from 'react';
import { IoPlay } from "react-icons/io5";
import { TbLetterYSmall } from 'react-icons/tb';
interface StreamActionProps {
    personStream: any,
    reloadData: () => void
    status: string | undefined
}

const StreamAction: React.FC<StreamActionProps> = ({ personStream, reloadData, status }) => {

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

    const startLive = useMutation({
        mutationKey: ['startlive'],
        mutationFn: (data: {
            stream_id: number
        }) => axiosInstance.get('/autolive-control/start-live', {
            params:{
                language:"en",
                stream_id: data.stream_id
            }
        }),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })
    const deleteStream = useMutation({
        mutationKey: ['delete-stream'],
        mutationFn: (data: {
            stream_id: number
        }) => axiosInstance.delete('/delete', { data: { stream_id: personStream } }),
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
        console.log(personStream)
        startLive.mutate({
            stream_id: personStream
        })
    };

    const confirmDelete: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        deleteStream.mutate({
            stream_id: personStream
        })
    };
    const w = useTranslations('Warning')
    const t = useTranslations('MyLanguage')
    return (
        <div className='flex gap-3'>

            <Tooltip title={ w('start_stream') }>
                <Popconfirm
                    title={ w('start_stream') }
                    description={w('start_this_stream')}

                    onConfirm={confirmStart}
                    okText={t('yes')}
                    cancelText={t('no')}

                    icon={<IoPlay style={{ color: '#1677ff' }} />}
                >
                    <Button type='primary' icon={<IoPlay />}></Button>

                </Popconfirm>
            </Tooltip>

            <Tooltip title={ w('stop_stream') }>
                <Popconfirm
                    title={w('stop_stream')}
                    description={ w('stop_this_stream') }
                    onConfirm={confirm}
                    okText={t('yes')}
                    cancelText={t('no')}

                    icon={<StopOutlined style={{ color: 'red' }} />}
                >
                    <Button type="default" disabled={status != 'running'} icon={<StopOutlined style={{
                        color: 'red'
                    }} />} ></Button>

                </Popconfirm>

            </Tooltip>
            <Tooltip title={ w('delete_stream') }>

                <Popconfirm
                    title={ w('delete_stream') }
                    description={w('delete_this_stream')}
                    onConfirm={confirmDelete}
                    okText={t('yes')}
                    cancelText={t('no')}
                    icon={<DeleteFilled style={{ color: 'red' }} />}
                >
                    <Button type="primary" danger icon={<DeleteFilled />}></Button>
                </Popconfirm>
            </Tooltip>
        </div>
    )
}

export default StreamAction
