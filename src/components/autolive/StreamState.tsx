import { StopOutlined } from '@ant-design/icons';
import { Tag } from 'antd';
import { useTranslations } from 'next-intl';
import React from 'react';
export enum StreamType {
    SCHEDULING = 'scheduling',
    INITALIZE = 'initalize',
    RUNNING = 'running',
    STOPPED = 'stopped'
}
interface StreamStateProps {
    state: string
}

const StreamState: React.FC<StreamStateProps> = ({ state }) => {
    const s = useTranslations('StreamStatus')
    switch (state) {
        case StreamType.SCHEDULING:
            return <Tag color='blue'>{s('scheduling')}</Tag>
        case StreamType.INITALIZE:
            return <Tag color='magenta'>{s('initalize')}</Tag>
        case StreamType.RUNNING:
            return <Tag color='green'>{s('running')}</Tag>
        case StreamType.STOPPED:
            return <Tag color='red'>{s('stopped')}</Tag>
        default:
            return <Tag color='error'>{s('error')}</Tag>
    }
}

export default StreamState
