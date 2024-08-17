import { Select } from 'antd';
import React from 'react';
interface VpsSelectProps{
    
}

const VpsSelect:React.FC<VpsSelectProps> = () => {
    return <>
        <Select placeholder="Select vps" style={{
            width: 200
            }} options={[{ value: 'alive1', label: <span>alive1</span> }]} />
    </>
}

export default VpsSelect



