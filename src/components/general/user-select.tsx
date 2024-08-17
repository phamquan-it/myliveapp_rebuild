import { Select } from 'antd';
import React from 'react';
interface UserSelectProps{
    
}

const UserSelect:React.FC<UserSelectProps> = () => {
    return <>
        <Select placeholder="Select user" style={{
            width: 200
            }} options={[{ value: 'john', label: <span>John</span> }]} />
    </>

}

export default UserSelect
