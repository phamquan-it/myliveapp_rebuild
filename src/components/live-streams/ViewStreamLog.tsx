import React, { useState } from 'react';
import StreamLog from '../admin/streams/log';
import { Button, Modal } from 'antd';
import { EyeFilled } from '@ant-design/icons';
interface ViewStreamLogProps {
    id: string
}

const ViewStreamLog: React.FC<ViewStreamLogProps> = ({ id }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false)
    }
    return <>
        <Button icon={<EyeFilled/>} onClick={() => {
            setIsModalOpen(true)
        }}></Button>
        <Modal title="Stream log" width={1000} open={isModalOpen} footer={[]} onCancel={handleCancel}>
            <StreamLog stream_id={id} />
        </Modal>
    </>
}

export default ViewStreamLog
