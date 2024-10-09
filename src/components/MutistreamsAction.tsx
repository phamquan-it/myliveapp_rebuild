import axiosInstance from '@/apiClient/axiosConfig';
import { StreamDataType } from '@/pages/dashboard/myautolive';
import { DeleteFilled, StopOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button, Popconfirm, PopconfirmProps, Tooltip, message } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
import { IoPlay } from 'react-icons/io5';
interface MutistreamsActionProps {
    streamsSelected: StreamDataType[]
}

const MutistreamsAction: React.FC<MutistreamsActionProps> = ({ streamsSelected }) => {


    const streamIdSelected: number[] = streamsSelected.reduce((acc, stream) => {
        if (stream.id !== undefined) {
            acc.push(stream.id);
        }
        return acc;
    }, [] as number[]);
    const startMultiStreams = useMutation({
        mutationKey: ['startlive'],
        mutationFn: (data: {
            stream_id: number[]
        }) => axiosInstance.post('/autolive-control/streams/start', data),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })
    const stopMultiStreams = useMutation({
        mutationKey: ['startlive'],
        mutationFn: (data: {
            stream_id: number[]
        }) => axiosInstance.post('/autolive-control/streams/start', data),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    const deleteMultiStreams = useMutation({
        mutationKey: ['startlive'],
        mutationFn: (data: {
            stream_id: number[]
        }) => axiosInstance.delete('/autolive-control/streams/start', {
            data
        }),
        onSuccess: () => {
            message.success("Success")
        },
        onError: (err) => {
            message.error(err.message)
        }
    })


    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(streamIdSelected)
        startMultiStreams.mutate({
            stream_id: streamIdSelected
        })
    };

    const confirmStop: PopconfirmProps['onConfirm'] = (e) => {
        stopMultiStreams.mutate({
            stream_id: streamIdSelected
        })
    };
    const confirmDelete: PopconfirmProps['onConfirm'] = (e) => {
        deleteMultiStreams.mutate({
            stream_id: streamIdSelected
        })
    };

    const w = useTranslations('Warning')
    const t = useTranslations('MyLanguage')
    return <div className='flex gap-1'>


        <Tooltip title={w('start_selected_stream')}>
            <Popconfirm
                title={w('start_streams')}
                description={`${w('start_selected_stream')}?`}
                onConfirm={confirm}
                icon={<IoPlay style={{
                    color: '#1677ff'
                }} />}
                okText={t('yes')}
                cancelText={t('no')}
            >
                <Button type="primary" icon={<IoPlay />}>Start live</Button>
            </Popconfirm>
        </Tooltip>
        <Tooltip title={w('stop_selected_stream')}>
            <Popconfirm
                title={w('stop_streams')}
                description={`${w('stop_selected_stream')}?`}
                onConfirm={confirmStop}
                icon={<StopOutlined style={{ color: "red" }} />}
                okText={t('yes')}
                cancelText={t('no')}
            >
                <Button icon={<StopOutlined style={{ color: "red" }} />}>Stop live</Button>
            </Popconfirm>
        </Tooltip>
        <Tooltip title={w('delete_selected_stream')}>
            <Popconfirm
                title={w('delete_streams')}
                description={`${w('delete_selected_stream')}?`}
                onConfirm={confirmDelete}
                okText={t('yes')}
                cancelText={t('no')}
                icon={<DeleteFilled style={{
                    color: 'red'
                }} />}
            >
                <Button type="primary" danger icon={<DeleteFilled />}>Delete</Button>
            </Popconfirm>
        </Tooltip>
    </div>
}

export default MutistreamsAction
