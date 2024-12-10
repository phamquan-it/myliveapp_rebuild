import React, { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import "@xterm/xterm/css/xterm.css";
import { Button } from "antd";
import { EyeFilled, SyncOutlined } from "@ant-design/icons";

interface ViewQueuesProcessProps {
    ipv4: string,
    service?: string
}
// Dynamic import to disable SSR
const ViewQueuesProcess: React.FC<ViewQueuesProcessProps> = ({ ipv4,service }) => {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const socketRef = useRef<any>(null);
    const [key, setKey] = useState(0);
    useEffect(() => {

        if (typeof window !== "undefined" && terminalRef.current) {
            const { Terminal } = require("@xterm/xterm");
            const { FitAddon } = require('@xterm/addon-fit');
            const { io } = require("socket.io-client");

            const terminal = new Terminal();
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);
            setTimeout(() => {
                fitAddon.proposeDimensions();
                terminal.open(terminalRef.current);
                fitAddon.fit();
            }, 500)



            // Ensure the fit addon is loaded and the terminal is fitted
            //fitAddon.fit();

            const socket = io(`${process.env.API_URL}/stream-log?ipv4=${ipv4}`);
            socketRef.current = socket;



            socket.emit("input", service);

            socket.on("message", (data: string) => {
                terminal.write(data);
            });

            // Fit the terminal to the container whenever the window is resized

            // Fit the terminal to the container whenever the window is resized
            const handleResize = () => {
                if (fitAddon) {
                    fitAddon.fit();
                }
            };
            window.addEventListener('resize', handleResize);

            return () => {
                terminal.dispose();
                socket.disconnect();
                window.removeEventListener('resize', handleResize);
            };
        }
        if (key == 0) {
            setKey(1);
        }

    }, [key]);

    useEffect(() => {
       setKey(key+1); 
    }, [service])

    const refreshComponent = () => {
        setKey(prevKey => prevKey + 1);
    };
    return (
        <div key={key}>
            <Button type="primary" onClick={refreshComponent} icon={<EyeFilled />}></Button>
            <div ref={terminalRef} style={{ width: "100%", height: "250px", overflow: "hidden" }}></div>
            {/* Component content */}
        </div>

    );
};

export default dynamic(() => Promise.resolve(ViewQueuesProcess), { ssr: false });
