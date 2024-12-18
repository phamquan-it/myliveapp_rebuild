import axiosInstance from '@/apiClient/axiosConfig';
import { StreamDataType } from '@/pages/dashboard/myautolive';
import { DeleteFilled, StopOutlined } from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Button, Popconfirm, PopconfirmProps, Tooltip, message } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
import { IoPlay } from 'react-icons/io5';
interface MutistreamsActionProps {
    streamsSelected: StreamDataType[],
    setStreamsSelected: (newStreamSelected: []) => void
    setSelectedRowKeys?: (streams: any[]) => void
}

const MutistreamsAction: React.FC<MutistreamsActionProps> = ({ streamsSelected, setStreamsSelected, setSelectedRowKeys }) => {
    const queryClient = useQueryClient()

    // start streams
    const startLive = useMutation({
        mutationKey: ['startlive'],
        mutationFn: (data: {
            stream_id: any[] | undefined
        }) => axiosInstance.get('/autolive-control/start-streams', {
            params: {
                language: "en",
                stream_id: data.stream_id
            }
        }),
        onSuccess: () => {
            message.success("Success")
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['activityStream'] })
            }, 3000)
        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    const streamIdSelected: number[] = streamsSelected.reduce((acc, stream) => {
        if (stream.id !== undefined) {
            acc.push(stream.id);
        }
        return acc;
    }, [] as number[]);

    const stopLive = useMutation({
        mutationKey: ['stoplive'],
        mutationFn: (data: any[]) => axiosInstance.get('/autolive-control/stop-streams', {
            params: {
                language: "en",
                stream_id: data
            }
        }),
        onSuccess: () => {
            message.success("Success")
            setStreamsSelected([])
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['activityStream'] })
            }, 3000)

        },
        onError: (err) => {
            message.error(err.message)
        }
    })

    const deleteMultiStreams = useMutation({
        mutationKey: ['startlive'],
        mutationFn: (streams: number[]) => axiosInstance.delete('/activity-stream/delete', {
            params: {
                streams
            }
        }),
        onSuccess: () => {
            message.success("Success")
            setTimeout(() => {
                queryClient.invalidateQueries({ queryKey: ['activityStream'] })
            }, 3000)
        },
        onError: (err) => {
            message.error(err.message)
        }
    })


    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        const ids = streamsSelected.map(stream => stream.id);
        startLive.mutate({
            stream_id: ids
        })
    };
    // stop streams
    const confirmStop: PopconfirmProps['onConfirm'] = (e) => {
        const ids = streamsSelected.map(stream => stream.id);
        stopLive.mutate(ids)
    };

    //delete stream
    const confirmDelete: PopconfirmProps['onConfirm'] = (e) => {
        const ids = streamsSelected.map(stream => stream.id ?? 0);
        deleteMultiStreams.mutate(ids)
    };


    const w = useTranslations('Warning')
    const t = useTranslations('MyLanguage')
    return <div className='grid sm:flex gap-1'>

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
