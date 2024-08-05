import { MenuOutlined, PauseCircleFilled, PauseOutlined, SignalFilled, StopFilled } from "@ant-design/icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { Button, Dropdown } from "antd";
import React from "react";
import { FaRunning, FaSquarespace } from "react-icons/fa";
import { TbSquare, TbTriangle } from "react-icons/tb";
interface VpsHideOptionProps{
  
} 
 const VpsHideOption:React.FC<VpsHideOptionProps> = ({})=>{
    const items = [
        { icon:<TbTriangle/>, label: 'Start', key: 'item-1' }, // 菜单项务必填写 key
        {icon: <SignalFilled style={{
          color: "red"
        }}/>, label: 'Stop all live', key: 'item-2' },
      ];
  return(
    <>
      <Dropdown menu={{ items }}>
        <Button type="default" icon={<MenuOutlined/>}>
            
        </Button>
      </Dropdown>
    </>
);
} 
 export default VpsHideOption