import axiosInstance from '@/apiClient/axiosConfig';
import { useQuery } from '@tanstack/react-query';
import { Tag } from 'antd';
import React, { useEffect, useState } from 'react';
interface NumOfStreamsVpsProps {
    slug: string
}

const NumOfStreamsVps: React.FC<NumOfStreamsVpsProps> = ({ slug }) => {
    const [numOfStream, setNumOfStream] = useState(0)
    try {
        const data = axiosInstance.get(`/autolive-control/get-count-streams-from-slug?slug=${slug}`).then((res) => {
            setNumOfStream(res.data)
        }).catch((err)=>{
            console.log(err.message)
        });

    } catch (e) {
    }
    return numOfStream
}

export default NumOfStreamsVps
