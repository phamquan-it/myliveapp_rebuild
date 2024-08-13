import { CaretRightFilled, CaretRightOutlined, DeleteFilled, SignalFilled, SyncOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Tooltip } from 'antd';
import React, { useState } from 'react';
import { TbArrowBarToRight, TbRewindForward50, TbSquare, TbSquareArrowRight, TbTriangle } from 'react-icons/tb';

const VpsHideOption = () => {
   const [vpsState, setVpsState] = useState('running');
   const [vps, setVps] = useState({
       status:''
   })
   const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
      case 'start':
          console.log('start');
        break;
      case 'stop':
          console.log('stop');
        break;
      case 'stopAllStream':
          console.log('stop stream');
        break;
      case 'restart':
        console.log('Stop all live clicked');
        break;
      case 'delete':
        console.log('Delete clicked');
        // Add your logic for 'delete vps' here
        break;
      default:
        break;
    }
  };

    const items: MenuProps['items']= [
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

    return <>
      <Dropdown trigger={['click']} menu={{ items, onClick: handleMenuClick }}>
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
}

export default VpsHideOption
