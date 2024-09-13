import { Tag } from 'antd';
import React from 'react';
export enum StreamType{
    SCHEDULING = 'scheduling',
    STARTING = 'starting',
    RUNNING = 'running',
    STOPPED = 'stopped'
}
interface StreamStateProps {
    state: StreamType
}

const StreamState: React.FC<StreamStateProps> = ({ state }) => {
    switch (state) {
        case StreamType.SCHEDULING:
            return <Tag color='blue'>Scheduling</Tag>
        case StreamType.STARTING:
            return <Tag color='orange'>Starting</Tag>
        case StreamType.RUNNING:
            return <Tag color='green'>Running</Tag>
        case StreamType.STOPPED:
            return <Tag color='red'>Stopped</Tag>
    }
    return <Tag color='red' />
}

export default StreamState
