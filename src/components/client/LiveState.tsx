import axiosClient from "@/apiClient/axiosClient";
import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useMutation } from "@tanstack/react-query";
import { Button, message, Tooltip } from "antd";
import React, { useState } from "react";
interface LiveStateProps{
  platfornId: number,
  liveKey: string,
  state: boolean
} 
 const LiveState:React.FC<LiveStateProps> = (props)=>{
    const [liveActive,setLiveActive] = useState(props.state)
    const { mutate } = useMutation({ 
      mutationFn: (status)=>axiosClient.post("/setLiveStatus",{status: status}),
      onSuccess: (()=>{
        message.success('Success')
        setLiveActive(!liveActive)
      }),
      onError:(()=>{
        message.error('Error')
      })
    });
  return(
    <>
    <Tooltip title={liveActive?"Stop": "Start"}>
    <Button type="default" onClick={()=>{
        mutate()
    }}>
        <FontAwesomeIcon className={liveActive?"text-red-500": "text-green-700"} icon={(liveActive)?faPause: faPlay} />
    </Button>
    </Tooltip>
    
    </>
);
} 
 export default LiveState