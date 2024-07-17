import { faPause, faPlay } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Tooltip } from "antd";
import React, { useState } from "react";
interface LiveStateProps{
  platfornId: number,
  liveKey: string,
  state: boolean
} 
 const LiveState:React.FC<LiveStateProps> = (props)=>{
    const [liveActive,setLiveActive] = useState(props.state)
  return(
    <>
    <Tooltip title={liveActive?"Stop": "Start"}>
    <Button type="default" onClick={()=>{
        setLiveActive(!liveActive)
    }}>
        <FontAwesomeIcon className={liveActive?"text-red-500": "text-green-700"} icon={(liveActive)?faPause: faPlay} />
    </Button>
    </Tooltip>
    
    </>
);
} 
 export default LiveState