import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';


interface LiveSpeedProps {
    stream: any,
}

const LiveSpeed: React.FC<LiveSpeedProps> = ({ stream }) => {
    const [streamData, setStreamData] = useState(stream)
    const [liveLiveInfo, setLiveInfo] = useState<any>()
        useEffect(() => {
            console.log("stream", stream)
            const newSocket = io('http://localhost:3031/live-info'); // replace with your server URL
        setInterval(() => {
            newSocket.emit("message",{
                stream_id: streamData.id,
                ipv4: streamData.ipv4
            } )
        }, 500)
        newSocket.on('message', message => {
            setLiveInfo(message)
        })


        return () => {
            newSocket.close();
        }
    }, [stream])

    return <>
        {liveLiveInfo?.speed}x
    </>

}

export default LiveSpeed
