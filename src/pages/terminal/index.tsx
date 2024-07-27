import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { io } from "socket.io-client";

export interface SSHInfo {
  ipv4OrHost: string;
  sshUser: string;
}

interface XtermUIProps {
  connectionState: boolean;
  SSHInfo: SSHInfo;
}

const XtermUI: React.FC<XtermUIProps> = ({ connectionState, SSHInfo }) => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);

  useEffect(() => {
    if (connectionState && terminalRef.current) {
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
  }, [connectionState, SSHInfo]);

  return <>
  <div ref={terminalRef} style={{ width: "800px", height: "410px" }}></div>
  </>;
};

export default XtermUI;
