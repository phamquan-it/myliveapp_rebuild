import { Tag } from "antd";
import React from "react";
export enum VpsStatusEnum{
    BUSY,
    FREEDOM,
    DEATH
}
interface VpsStatusProps{
  status: VpsStatusEnum
} 
 const VpsStatus:React.FC<VpsStatusProps> = ({status})=>{
  return(
    <>
    {(status == VpsStatusEnum.BUSY)?
        <Tag color="orange">BUSY</Tag>:(status == VpsStatusEnum.FREEDOM)? 
        <Tag color="green">FREEDOM</Tag>:
        <Tag color="red">DEATH</Tag>}
    </>
);
} 
 export default VpsStatus