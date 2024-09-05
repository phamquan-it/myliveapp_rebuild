import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
interface XtermLogProps{
    isModalOpen: boolean
}
export default function Home(xtermLogProps:XtermLogProps) {
    const terminalRef = useRef<HTMLDivElement | null>(null);
    const socketRef = useRef<any>(null);
    const [key, setKey] = useState(0);
    const [service, setService] = useState('log')

    const socket = io(`http://localhost:3000`);
    useEffect(() => {
        if (typeof window !== "undefined" && terminalRef.current) {
            const { Terminal } = require("@xterm/xterm");
            const { FitAddon } = require("@xterm/addon-fit");

            const terminal = new Terminal();
            const fitAddon = new FitAddon();
            terminal.loadAddon(fitAddon);
            setTimeout(() => {
                fitAddon.proposeDimensions();
                terminal.open(terminalRef.current);
                fitAddon.fit();
            }, 50);

            // Ensure the fit addon is loaded and the terminal is fitted
            //fitAddon.fit();

            socketRef.current = socket;

            socket.emit("input", service);

            socket.on("message", (data: string) => {
                console.log(data);
                terminal.write(data);
            });

            // Fit the terminal to the container whenever the window is resized
            const handleResize = () => {
                if (fitAddon) {
                    fitAddon.fit();
                }
            };
            window.addEventListener("resize", handleResize);

            return () => {
                terminal.dispose();
                window.removeEventListener("resize", handleResize);
            };
        }
        // Initialize the socket connection
    }, [key]);
    setTimeout(() => {
        if (key < 1)
            setKey(key + 1);
    }, 100)

    return (
        <main>
            <button
                onClick={() => {
                    socket.disconnect();
                    setKey(key + 1);
                    setService('apache2')
                }}
            >
                apache2
            </button>
            <button
                onClick={() => {
                    socket.disconnect();
                    setKey(key + 1);
                    setService('mssql-server')
                }}
            >
                sqlserver
            </button>
        {xtermLogProps.isModalOpen?<div
                className={(key < 1) ? 'invisible' : 'visible'}
                id="terminal"
                ref={terminalRef}
                style={{
                    height: 200,
                    width: "100%"
                }}
        />:''
}

        </main>
    );
}
