import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
interface NumOfStreamsVpsProps {
    slug: string
}

const NumOfStreamsVps: React.FC<NumOfStreamsVpsProps> = ({ slug }) => {
    const [numOfStream, setNumOfStream] = useState(0)
    const data = axiosInstance.get(`/vps-provider/get-count-streams-runing?slug=${slug}`).then((res)=>{
        setNumOfStream(res.data)
    });
    
    return <Tag color="green">{numOfStream} streamings</Tag>
}

export default NumOfStreamsVps
