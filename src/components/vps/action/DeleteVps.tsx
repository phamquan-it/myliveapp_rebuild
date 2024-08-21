import { Button, Modal, message } from 'antd';
import React, { useState } from 'react';
interface DeleteVpsProps {
    deletefunction: any,
    slug: string
}

const DeleteVps: React.FC<DeleteVpsProps> = ({ deletefunction, slug }) => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const handleCancel = () => {
        setIsModalOpen(false)
    }

    const handleOk = () => {

        if (slug == "sysliveserve") return;
        //       message.error(' no ok');
        deletefunction()
        setIsModalOpen(false);
    }
    return <>
        <Modal title="Delete vps" okButtonProps={{
            style: {
                backgroundColor: 'red'
            }
        }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure?</p>
        </Modal>
        <Button size="small" type="link" style={{
            margin: 0,
            padding: 0,
            display: "inline",
            border: "none",
            boxShadow: "none",
            color: "black"
        }} onClick={() => {
            setIsModalOpen(true)
        }}>Delete vps</Button>
    </>

}

export default DeleteVps
