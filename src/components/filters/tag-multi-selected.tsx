import { Tag } from 'antd';
import React from 'react';

interface TagMultiSelectedProps {
    title: string
    data: string[]
}
const TagMultiSelected: React.FC<TagMultiSelectedProps> = ({ title,data }) => {
    
    return <>
        <Tag color="magenta">{title}{data.map((text)=>text)}</Tag>
    </>
}

export default TagMultiSelected
