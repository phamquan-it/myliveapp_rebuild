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

const XtermUI: React.FC<XtermUIProps> = ({ SSHInfo,  }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);
  const [key, setKey] = useState(0)
  useEffect(() => {
    if (terminalRef.current) {
      const terminal = new Terminal();
      terminal.open(terminalRef.current);

      const socket = io("https://api.golive365.top/");
      socketRef.current = socket;

      terminal.onData((data) => {
        socket.emit("input", data);
      });

      socket.on("output", (data) => {
        terminal.write(data);
      });

      if (SSHInfo) {
        socket.emit("input", `ssh ${SSHInfo.sshUser}@${SSHInfo.ipv4OrHost}\n`);
      }
    }
    if(key<1)
    setKey(key+1)
  }, [key]); // Add reconnect as a dependency

 


  return (
    <>
      <div key={key} ref={terminalRef} style={{ width: "100%", height: "410px", overflow: "hidden" }}></div>
    </>
  );
};

export default XtermUI;
