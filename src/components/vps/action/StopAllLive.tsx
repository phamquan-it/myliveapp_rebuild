import { Button, Modal } from 'antd';
import React, { useState } from 'react';
interface StopAllLiveProps{
    stopfunction: any 
}

const StopAllLive:React.FC<StopAllLiveProps> = ({stopfunction}) => {
    const [isModalOpen, setIsModalOpen] = useState( false )
    const handleCancel = ()=> {
        setIsModalOpen(false)
    }

    const handleOk = () => {
        stopfunction()
        setIsModalOpen(false);
    }
    return <>
        <Modal title="Stop all live" okButtonProps={{
            style:{
                backgroundColor: 'red'
            }
            }} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <p>Stop all live?</p>
        </Modal>
        <Button size='small' type="link" style={{
            margin: 0,
            padding: 0,
            display: "inline",
            border: "none",
            boxShadow: "none",
            color: "black"
            }} onClick={()=>{
            setIsModalOpen(true)
        }}>Stop all live</Button>
    </>

}

export default StopAllLive
