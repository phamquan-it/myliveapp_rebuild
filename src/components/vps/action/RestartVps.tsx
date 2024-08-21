import { Button, Modal } from 'antd';
import React, { useState } from 'react';
interface RestartVpsProps {
    restartfunction: any
}

const RestartVps: React.FC<RestartVpsProps> = ({ restartfunction }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = () => {
        restartfunction()
        setIsModalOpen(false);
    }
    return <>
        <Modal title="Restart"
            open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Restart this vps?</p>
        </Modal>
        <Button size='small' type="link" style={{
            margin: 0,
            padding: 0,
            display: "inline",
            border: "none",
            boxShadow: "none",
            color: "black"
        }} onClick={() => {
            setIsModalOpen(true)
        }}>Restart</Button>
    </>

}

export default RestartVps
