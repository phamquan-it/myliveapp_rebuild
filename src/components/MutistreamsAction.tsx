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
    return <>
        <div className={`py-3 flex gap-2 ${(streamsSelected.length == 0) ? "hidden" : ""}`}>


            <Tooltip title={w('start_selected_stream')}>
                <Popconfirm
                    title="Start streams"
                    description={`${w('start_selected_stream')}?`}
                    onConfirm={confirm}
                    icon={<IoPlay style={{
                        color: '#1677ff'
                    }} />}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button type="primary" icon={<IoPlay />}></Button>
                </Popconfirm>
            </Tooltip>
            <Tooltip title={w('stop_selected_stream')}>
                <Popconfirm
                    title="Stop streams"
                    description={`${w('stop_selected_stream')}?`}
                    onConfirm={confirmStop}
                    icon={<StopOutlined style={{ color: "red" }} />}
                    okText="Yes"
                    cancelText="No"
                >
                    <Button icon={<StopOutlined style={{ color: "red" }} />}></Button>
                </Popconfirm>

            </Tooltip>
            <Tooltip title={w('delete_selected_stream')}>
                <Popconfirm
                    title="Delete streams"
                    description={`${w('delete_selected_stream')}?`}
                    onConfirm={confirmDelete}
                    okText="Yes"
                    icon={<DeleteFilled style={{
                        color: 'red'
                    }} />}
                    cancelText="No"
                >
                    <Button type="primary" danger icon={<DeleteFilled />}></Button>
                </Popconfirm>

            </Tooltip>

        </div>
    </>
}

export default MutistreamsAction
