import { Input } from 'antd';
import React from 'react';
interface StreamLogProps{
   stream_id: number    
}

const StreamLog:React.FC<StreamLogProps> = () => {
    return <>
        <Input.TextArea>logs</Input.TextArea>
    </>

}

export default StreamLog
