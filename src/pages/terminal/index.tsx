import React, { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import "@xterm/xterm/css/xterm.css";
import { io } from "socket.io-client";
import { GetStaticPropsContext } from "next";

export interface SSHInfo {
  ipv4OrHost: string;
  sshUser: string;
}

const XtermUI = () => {
  const terminalRef = useRef<HTMLDivElement | null>(null);
  const socketRef = useRef<any>(null);
  const terminal = useRef<Terminal | null>(null);

  useEffect(() => {
    console.log("Setting up terminal and socket");

    if (terminalRef.current) {
      terminal.current = new Terminal();
      terminal.current.open(terminalRef.current);

      const socket = io("https://api.golive365.top", {
        transports: ['websocket'],
      });
      socketRef.current = socket;

      terminal.current.onData((data) => {
        console.log("Sending data:", data);
        socket.emit("input", data);
      });

      socket.on("output", (data) => {
        console.log("Received data:", data);
        terminal.current?.write(data);
      });

      socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err);
      });

      socket.on("disconnect", () => {
        console.warn("Socket disconnected");
      });

      // Example of sending an initial command, modify as needed
      socket.emit("input", `ssh admin@sysliveserve.vps.webdock.cloud\n`);

      return () => {
        console.log("Cleaning up terminal and socket");
        terminal.current?.dispose();
        socket.disconnect();
      };
    }
  }, []);

  return <div ref={terminalRef} style={{ width: "800px", height: "410px" }}></div>;
};

export default XtermUI;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`../../../messages/${locale}.json`)).default,
    },
  };
}
