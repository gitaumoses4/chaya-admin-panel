import React from 'react';

export const ImageBackground = (props) => {
  return (
    <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }} className={props.className}>
      <img src={props.src} alt="" style={{ width: '100%', height: 'auto' }} />
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>{props.children}</div>
    </div>
  );
};
