import { LoadingOutlined } from "@ant-design/icons";
import { useQuery } from "@tanstack/react-query";
import { Spin, Tag } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
export enum VpsStatusEnum{
    BUSY,
    FREEDOM,
    DEATH
}
interface VpsStatusProps{
  record: any
} 
 const VpsStatus:React.FC<VpsStatusProps> = ({record})=>{
  console.log(record.ipv4);
  const [status,setStatus] = useState(1)
  useEffect(()=>{
    const res =  axios.get('http://localhost:3031/check-health', {
      params: {
        port: record.port,
        ipv4: record.ipv4,
      },
      headers: {
        'accept': '*/*',
      },
      timeout: 3000,
    }).then(()=>{
      setStatus(2)
    }).catch(()=>{
      setStatus(3)
    })
  },[record])
  return <>{(status==1)?
     <Spin indicator={<LoadingOutlined spin />} size="small" />:(status == 2)?
     <Tag color="green">ACTIVE</Tag>:
     <Tag color="red">DEATH</Tag>
     }</>
  // if(isFetching) return  <Spin indicator={<LoadingOutlined spin />} size="small" />
  // if(isSuccess) return <>
  // <Tag color="green">{data?.data}</Tag>
  // </>
  // if (isError) return <Tag color="red">{data?.data}</Tag>
} 
 export default VpsStatus