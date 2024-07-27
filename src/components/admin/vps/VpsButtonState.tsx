import { CaretRightOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Input, message, Modal, Tooltip } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaSquare } from "react-icons/fa";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import Title from "antd/es/typography/Title";
interface VpsButtonStateProps{
  record: any
} 
 const VpsButtonState:React.FC<VpsButtonStateProps> = ({record})=>{
    const [disbleDeleteOkButton,setDisbleDeleteOkButton] = useState(true)
    const [vpsState,setVpsState] = useState(record.status)

    const { mutate, isPending, isError } = useMutation({ 
        mutationFn: ()=> 
        axios.post(`https://api.webdock.io/v1/servers/${record.slug}/actions/${(vpsState == "running")?"stop":"start"}`, null, webdockConfig),
        onSuccess:()=>{
            if(vpsState=="stopped") 
                setVpsState("running")
                else setVpsState("stopped")
            message.success("Success")
            setOpenModal(false)
        },
        onError:()=>{
            message.error("Error")
        }
    });
    const [openModal,setOpenModal] = useState(false)
    const hideModal = ()=>{ 
     setOpenModal(false)
    }
    const [confirmText,setConfirmText] = useState("")
    useEffect(()=>{
        if(confirmText == record.slug)
            setDisbleDeleteOkButton(false)
        else setDisbleDeleteOkButton(true)
    },[confirmText])
  return(
    <div>
         <Modal title="Stop this vps?" open={openModal} onCancel={hideModal} okButtonProps={{disabled: disbleDeleteOkButton, loading: isPending}} onOk={()=>{
            hideModal();
            mutate()
         }}>
            <Title level={5}>{`Please enter '${record.slug}' for confirm!`}</Title>
            <Input placeholder="" value={confirmText} onChange={(e)=>{
                setConfirmText(e.target.value)
            }}/>
        </Modal>
        {vpsState == 'running'?
            <Tooltip title="Stop">
                <Button type="primary" icon={<FaSquare/>} danger loading={isPending} onClick={()=>{
                    if(record.slug == 'sysliveserve') return
                    setOpenModal(true)
                }} disabled={record.slug == 'sysliveserve'}/>
            </Tooltip>  
            :
            <Tooltip title="Start">
                <Button type="primary" icon={<CaretRightOutlined />} loading={isPending} onClick={()=>{
                    if(record.slug == 'sysliveserve') return
                    mutate()
                }}/>
            </Tooltip>
            }
    </div>
);
} 
 export default VpsButtonState