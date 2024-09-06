import React, { ReactNode, useEffect, useRef, useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const TerminalController = (props = {}) => {
    const [inputValue, setInputValue] = useState('');
    const [ws,setWs] = useState<any>(null)
    const [terminalLineData, setTerminalLineData] = useState([
        <TerminalOutput key='1'>Welcome to the React Terminal UI Demo!</TerminalOutput>
    ]);

      const r = useRef<WebSocket | null>(null);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8080');
        setWs(socket);
        socket.onopen = () => {
            console.log('WebSocket connection established');

        };
        socket.onmessage = (event) => {
            setTerminalLineData(prevLines => [
                ...prevLines,
                <TerminalOutput key={prevLines.length}>{event.data}</TerminalOutput>
            ]);
        };
    },[])
    useEffect(()=>{
        const command = inputValue.trim();
          if (command) {
            ws.send(command);
            setInputValue('');
          }
    }, [inputValue])
    // Terminal has 100% width by default so it should usually be wrapped in a container div
    return (
        <div className="container">
            <Terminal name='React Terminal Usage Example' prompt={'$'} colorMode={ColorMode.Dark} onInput={(e)=>{
                setInputValue(e)
            }}>
                <div>
                {terminalLineData}
                </div>
            </Terminal>
        </div>
    )
};
export default TerminalController;
