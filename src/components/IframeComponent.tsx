// components/IframeComponent.js (or IframeComponent.tsx for TypeScript)

import React from 'react';

const IframeComponent = () => {
  return (
    <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', maxWidth: '100%', background: '#000' }}>
      <iframe
  src="https://webdock.io/en/dash/webssh/sysliveserve/admin"
  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; microphone; camera; midi; payment; usb; vr; fullscreen"
  allowFullScreen
  title="Embedded Content"
/>

    </div>
  );
};

export default IframeComponent;
