import React, { useState } from 'react';
import Terminal, { ColorMode, TerminalOutput } from 'react-terminal-ui';

const TerminalController = (props = {}) => {
  const [terminalLineData, setTerminalLineData] = useState([
    // eslint-disable-next-line react/jsx-key
    <TerminalOutput>Welcome to the React Terminal UI Demo!</TerminalOutput>
  ]);
  // Terminal has 100% width by default so it should usually be wrapped in a container div
  return (
    <div className="container">
      <Terminal name='React Terminal Usage Example' colorMode={ ColorMode.Dark }  onInput={ terminalInput => console.log(`New terminal input received: '${ terminalInput }'`) }>
        { terminalLineData }
      </Terminal>
    </div>
  )
};
export default TerminalController;