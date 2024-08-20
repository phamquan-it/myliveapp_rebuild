import { Button, Modal } from 'antd';
import React, { useState } from 'react';
interface StopVpsProps{
    stopfunction: any 
}

const StopVps:React.FC<StopVpsProps> = ({stopfunction}) => {
    const [isModalOpen, setIsModalOpen] = useState( false )
    const handleCancel = ()=> {
        setIsModalOpen(false)
    }

    const handleOk = () => {
        stopfunction()
    }
    return <>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Are you sure?</p>
        </Modal>
        <Button type="link" style={{
            margin: 0,
            padding: 0,
            display: "inline",
            border: "none",
            boxShadow: "none",
            color: "black"
            }} onClick={()=>{
            setIsModalOpen(true)
        }}>StopVps</Button>
    </>

}

export default StopVps
