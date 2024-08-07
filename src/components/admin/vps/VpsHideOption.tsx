import { CaretRightOutlined, DeleteFilled, EllipsisOutlined, MenuOutlined, PauseCircleFilled, PauseOutlined, PlaySquareTwoTone, SignalFilled, StopFilled, SyncOutlined } from "@ant-design/icons";
import { icon } from "@fortawesome/fontawesome-svg-core";
import { useMutation } from "@tanstack/react-query";
import { Button, Dropdown, message, Modal, Tooltip } from "antd";
import { MenuProps } from "antd/lib";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaCircle, FaRunning, FaSquarespace } from "react-icons/fa";
import { TbSquare, TbTriangle, TbTriangleFilled } from "react-icons/tb";
import { webdockConfig } from "../../../../WEBDOCK_PROVIDER/APIRequest/config";
import axiosInstance from "@/apiClient/axiosConfig";
interface VpsHideOptionProps {
  vps: any
}
const VpsHideOption: React.FC<VpsHideOptionProps> = ({ vps }) => {
  const [vpsState, setVpsState] = useState(vps.status)
  
  useEffect(()=>{
     const updateState = setTimeout(()=>{
        if(vpsState != 'stopped' || 'running'){
          getVpsInfo.mutate()
        }
    }, 8000)
  }, [])

  //get vps info 
  const getVpsInfo = useMutation({ 
    mutationFn:  ()=>axios.get(`https://api.webdock.io/v1/servers/${vps.slug}`, 
    webdockConfig),
    onSuccess: (data)=>{
      if(data.data.status != 'stopped' || data.data.status != 'running')
        setVpsState(data.data.status);
    }
  });

  //stop vps mutation
  const { mutate, isPending, isError } = useMutation({
    mutationFn: () =>
      axios.post(`https://api.webdock.io/v1/servers/${vps.slug}/actions/stop`, null, webdockConfig),
    onSuccess: () => {
      message.success("Success");
      setVpsState("stopping")
    },
    onError: (err) => {
      message.error('Error')
    }
  });
  //start vps mutation
  const startVps = useMutation({
    mutationFn: () =>
      axios.post(`https://api.webdock.io/v1/servers/${vps.slug}/actions/start`, null, webdockConfig),
    onSuccess: () => {
      message.success("Success");
      setVpsState("starting")
    },
    onError: (err) => {
      message.error('Error')
    }
  });

  //delete vps mutation
  const deleteVps = useMutation({
    mutationFn: () =>
      axios.delete(`https://api.webdock.io/v1/servers/${vps.slug}`, webdockConfig),
    onSuccess: () => {
      message.success("Success");
      setVpsState("stopping")
    },
    onError: (err) => {
      message.error('Error')
    }
  });
  //stop all live mutation
  const stopAllLive = useMutation({
    mutationFn: () =>
      axiosInstance.post("/autolive-control/stop-all-live", {
        ipv4: vps.ipv4
      }),
    onSuccess: () => {
      message.success("Success");
    },
    onError: (err) => {
      message.error('Error')
    }
  });
  // restart vps mutation
  const restartVps = useMutation({
    mutationFn: () =>
      axios.post(`https://api.webdock.io/v1/servers/${vps.slug}/actions/reboot`, null, webdockConfig),
    onSuccess: () => {
      message.success("Success");
    },
    onError: (err) => {
      message.error('Error')
    }
  });

  // dropdown item
  const items = [
    { icon: <TbTriangle style={{ color: "green" }} />, label: 'Start', key: 'start' }, // 菜单项务必填写 key
    {
      icon: <TbSquare style={{
        color: "red"
      }} />, label: 'Stop', key: 'stop'
    }, // 菜单项务必填写 key
    {
      icon: <SignalFilled style={{
        color: "red"
      }} />, label: 'Stop all live', key: 'stopAllStream'
    },
    {
      icon: <SyncOutlined style={{
        color: "#1677ff"
      }} />, label: 'Restart', key: 'restart'
    },
    {
      //disabled: true,
      icon: <DeleteFilled style={{
        color: "red"
      }} />, label: 'Delete', key: 'delete'
    }, // 菜单项务必填写 key
  ];
  // handle dropdown
  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e);
    switch (e.key) {
      case 'start':
        if(vpsState == 'running') {
          message.info("This server is runing");
          return;
        }
        console.log('Start clicked');
        startVps.mutate()
        // Add your logic for 'Start' here
        break;
      case 'stop':
        console.log('Stop clicked');
        if (vps.slug == "sysliveserve") return;
        if(vpsState == 'stopped') {
          message.info("This server is stopped");
          return;
        }
        mutate()
        break;
      case 'stopAllStream':
        console.log('Stop all live clicked');
        stopAllLive.mutate();
        // Add your logic for 'Stop all live' here
        break;
      case 'restart':
        console.log('Stop all live clicked');
        restartVps.mutate()
        // Add your logic for 'Stop all live' here
        break;
      case 'delete':
        console.log('Delete clicked');

        if (vps.slug == "sysliveserve" || vps.slug == 't8') return;
        console.log(' no ok');

        deleteVps.mutate()
        // Add your logic for 'delete vps' here
        break;
      default:
        break;
    }
  };
  return (
    <>

      <Dropdown menu={{ items, onClick: handleMenuClick }}>
        <Tooltip title={vps.status}>
          <Button type="primary" danger={(vpsState?.includes("stop"))} 
          loading={vpsState == "stopping" 
          || vpsState == "starting" 
          || vps.status == 'provisioning'}
          icon={<CaretRightOutlined />}>

          </Button>
        </Tooltip>

      </Dropdown>
    </>
  );
}
export default VpsHideOption