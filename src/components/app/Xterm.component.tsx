import React, { useEffect, useRef, useState } from "react";
import dynamic from 'next/dynamic';
import "@xterm/xterm/css/xterm.css";
import { Button, Modal } from "antd";
import { EyeFilled, SyncOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";



export interface SSHInfo {
    ipv4OrHost: string;
    sshUser: string;
}

interface XtermUIProps {
    SSHInfo: SSHInfo;
}
// Dynamic import to disable SSR
const XtermUI: React.FC<XtermUIProps> = ({ SSHInfo }) => {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const socketRef = useRef<any>(null);
    const router = useRouter()
    const [key, setKey] = useState(0);

    const [isModalOpen, setIsModalOpen] = useState(false)
    useEffect(() => {
        if (isModalOpen)
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
                const socket = io(process.env.API_URL);
                socketRef.current = socket;
                terminal.onData((data: any) => {
                    socket.emit("input", data);
                });

                socket.on("output", (data: any) => {
                    terminal.write(data);
                });

                if (SSHInfo) {
                    socket.emit("input", `ssh ${SSHInfo.sshUser}@${SSHInfo.ipv4OrHost}\n`);
                }
                socket.on("message", (data: string) => {
                    terminal.write(data);
                });

                const handleResize = () => {
                    if (fitAddon) {
                        fitAddon.fit();
                    }
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

                };
                window.addEventListener('resize', handleResize);

                return () => {
                    terminal.dispose();
                    socket.disconnect();
                    window.removeEventListener('resize', handleResize);
                };

                // Fit the terminal to the container whenever the window is resized

                // Fit the terminal to the container whenever the window is resized
                window.addEventListener('resize', handleResize);

            }
        if (key < 3) {
            setKey(key + 1)
        }

    }, [SSHInfo, key, isModalOpen, router.query]);

    const handleCancel = () => {
        setIsModalOpen(false)
    }
    useEffect(() => {
        router.push({ query: router.query })
    }, [isModalOpen])

    return (
        <div>
            <Button type="default" onClick={() => {
                router.push({ query: {} })
                setIsModalOpen(true)
            }} icon={<>&gt;_</>} ></Button>
            <Modal title="Terminal" destroyOnClose width={800} open={isModalOpen} onCancel={handleCancel} footer={[]}>
                <div ref={terminalRef} style={{ width: "100%", height: 400, overflow: "hidden" }}></div>
            </Modal>
        </div>
    );
};

export default dynamic(() => Promise.resolve(XtermUI), { ssr: false });
