import React, { useEffect, useRef, useState } from "react";
import { Terminal } from "@xterm/xterm"; // Corrected import path
import "@xterm/xterm/css/xterm.css";
import { io } from "socket.io-client";
import { Button } from "antd";
import { useRouter } from "next/router";

export interface SSHInfo {
  ipv4OrHost: string;
  sshUser: string;
}

interface XtermUIProps {
  connectionState: boolean;
  SSHInfo: SSHInfo;
}

const XtermUI: React.FC<XtermUIProps> = ({ connectionState, SSHInfo }) => {
  const router = useRouter();
  const [reconnect, setReconnect] = useState(false);
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    console.log("Connection state: " + connectionState);
  }, [connectionState]);

  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new Terminal();
      terminal.open(terminalRef.current);

      const socket = io("http://localhost:3031");
      socketRef.current = socket;

      terminal.onData((data) => {
        socket.emit("input", data);
      });

      socket.on("output", (data) => {
        terminal.write(data);
      });

      socket.emit("input", `ssh ${SSHInfo.sshUser}@${SSHInfo.ipv4OrHost}\n`);

      return () => {
        socket.disconnect();
      };
    }
  }, [SSHInfo, reconnect]); // Add reconnect as a dependency

  const handleReconnect = () => {
    setReconnect((prev) => !prev); // Toggle the reconnect state
  };

  const handleRunJavaVersion = () => {
    if (socketRef.current) {
      socketRef.current.emit("input", "exit\n");
      socketRef.current.emit("input", "ssh phamquan@sysliveserve.vps.webdock.cloud\n")
    }
  };

  return (
    <>
      <div ref={terminalRef} style={{ width: "800px", height: "410px", overflow: "hidden" }}></div>
      <Button onClick={handleRunJavaVersion}>Exit</Button>
      <Button type="default" onClick={()=>{
        socketRef.current.emit("input", "ssh phamquan@sysliveserve.vps.webdock.cloud\n")
      }}>Connect</Button>
      
    </>
  );
};

export default XtermUI;
