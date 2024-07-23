import React, { useRef, forwardRef } from 'react';
import { Input, InputProps, InputRef } from 'antd';

// Create a forwardRef component to wrap the antd Input component
const AntdInputWithRef = forwardRef<InputRef, InputProps>((props, ref) => (
  <Input {...props} ref={ref} />
));

// Set the display name for the forwardRef component
AntdInputWithRef.displayName = 'AntdInputWithRef';

export default AntdInputWithRef