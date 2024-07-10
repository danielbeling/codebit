import React from 'react';

const spinnerStyle = {
  position: 'relative',
  width: '33.6px',
  height: '33.6px',
  perspective: '67.2px'
};

const spinnerDivStyle = {
  width: '100%',
  height: '100%',
  background: '#474bff',
  position: 'absolute',
  left: '50%',
  transformOrigin: 'left',
  animation: 'spinner-16s03x 2s infinite'
};

const keyframes = `
@keyframes spinner-16s03x {
  0% {
    transform: rotateY(0deg);
  }
  50%, 80% {
    transform: rotateY(-180deg);
  }
  90%, 100% {
    opacity: 0;
    transform: rotateY(-180deg);
  }
}
`;

export default function Loading() {
  return (
    <>
      <style>{keyframes}</style>
      <div style={spinnerStyle}>
        <div style={{ ...spinnerDivStyle, animationDelay: '0.15s' }}></div>
        <div style={{ ...spinnerDivStyle, animationDelay: '0.3s' }}></div>
        <div style={{ ...spinnerDivStyle, animationDelay: '0.45s' }}></div>
        <div style={{ ...spinnerDivStyle, animationDelay: '0.6s' }}></div>
        <div style={{ ...spinnerDivStyle, animationDelay: '0.75s' }}></div>
      </div>
    </>
  );
}
