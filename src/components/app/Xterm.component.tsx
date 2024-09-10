import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm"; // Corrected import path
import "@xterm/xterm/css/xterm.css";
import { io } from "socket.io-client";
import { Button } from "antd";
import { FitAddon } from '@xterm/addon-fit';

export interface SSHInfo {
    ipv4OrHost: string;
    sshUser: string;
}

interface XtermUIProps {
    SSHInfo?: SSHInfo;
}

const XtermUI: React.FC<XtermUIProps> = ({ SSHInfo, }) => {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const socketRef = useRef<any>(null);
    const [key, setKey] = useState(0)


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
            }, 200)


            const socket = io("https://api.golive365.top/");
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

        }


    }, [key]); // Add reconnect as a dependency

    useEffect(() => {
        if (key < 1)
            setTimeout(() => {
                setKey(key + 1)
            }, 400)

    }, [key])
    return (
        <>
            <div key={key} ref={terminalRef} className={(key<1)?'invisible':''} style={{ width: "100%", height: "392px", overflow: "hidden" }}></div>
        </>
    );
};

export default XtermUI;
