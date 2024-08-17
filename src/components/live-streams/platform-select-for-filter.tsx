import { Select } from 'antd';
import React from 'react';
interface PlatformSelectForFilterProps{
    
}

const PlatformSelectForFilter:React.FC<PlatformSelectForFilterProps> = () => {
    return <>
        <Select options={[{ value: 'sample', label: <span>sample</span> }]} />
    </>
}

export default PlatformSelectForFilter
