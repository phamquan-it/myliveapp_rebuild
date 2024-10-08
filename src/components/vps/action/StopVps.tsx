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
        setIsModalOpen(false);
    }
    return <>
        <Modal title="Stop vps" okButtonProps={{
            style:{
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
            }} onClick={()=>{
            setIsModalOpen(true)
        }}>Stop vps</Button>
    </>

}

export default StopVps
