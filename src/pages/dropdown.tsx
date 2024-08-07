import type { MenuProps } from 'antd';
import { Dropdown } from 'antd';
import React from 'react';


const App: React.FC = () => (
<>

return (
  <Dropdown trigger={['click']} menu={{ items:
 [
  { label: '菜单项一', key: 'item-1' },
  { label: '菜单项二', key: 'item-2' },
] }}>
    <a>Hover me</a>
  </Dropdown>
);

</>
);

export default App;