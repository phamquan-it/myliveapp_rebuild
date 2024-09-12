import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';


interface LiveSpeedProps {
    stream_id: number
}

const LiveSpeed: React.FC<LiveSpeedProps> = ({ stream_id }) => {
    const [liveLiveInfo, setLiveInfo] = useState<any>()
        useEffect(() => {
        const newSocket = io('http://localhost:3031/live-info'); // replace with your server URL
        setInterval(() => {
            newSocket.emit("message", '1')
        }, 500)
        newSocket.on('message', message => {
            setLiveInfo(message)
        })


        return () => {
            newSocket.close();
        }
    }, [stream_id])

    return <>
        {liveLiveInfo?.speed}x
    </>

}

export default LiveSpeed
