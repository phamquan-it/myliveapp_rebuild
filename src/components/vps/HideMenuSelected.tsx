import { Button } from 'antd';
import React from 'react';
import StartVps from './HideMenuVpsAction/StartVps';
import StopVps from './HideMenuVpsAction/StopVps';
import DeleteVps from './HideMenuVpsAction/DeleteVps';
import RestartVps from './HideMenuVpsAction/RestartVps';
import StopAllLive from './HideMenuVpsAction/StopAllLive';
interface HideMenuSelectedProps {
    selectedRows: any
}

const HideMenuSelected: React.FC<HideMenuSelectedProps> = ({ selectedRows }) => {
    return <>
        <div className='grid sm:flex gap-2'>
            <StartVps vps={selectedRows} />
            <StopVps vps={selectedRows} />
            <StopAllLive vps={selectedRows} />
            <RestartVps vps={selectedRows} />
            <DeleteVps vps={selectedRows} />
        </div>
    </>
}

export default HideMenuSelected
