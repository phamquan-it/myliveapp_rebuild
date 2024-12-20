import { Button } from 'antd';
import React from 'react';
import StartVps from './HideMenuVpsAction/StartVps';
import StopVps from './HideMenuVpsAction/StopVps';
import DeleteVps from './HideMenuVpsAction/DeleteVps';
import RestartVps from './HideMenuVpsAction/RestartVps';
import StopAllLive from './HideMenuVpsAction/StopAllLive';
interface HideMenuSelectedProps {
    selectedRowKeys: any
}

const HideMenuSelected: React.FC<HideMenuSelectedProps> = ({ selectedRowKeys }) => {
    return <>
        <div className='grid sm:flex gap-2'>
            <StartVps vps={selectedRowKeys} />
            <StopVps vps={selectedRowKeys} />
            <StopAllLive vps={selectedRowKeys} />
            <RestartVps vps={selectedRowKeys} />
            <DeleteVps selectedRowKeys={selectedRowKeys} />
        </div>
    </>
}

export default HideMenuSelected
