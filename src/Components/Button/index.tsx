import React from 'react';
import './Button.css';

interface ButtonProps {
  width?: string;
  height?: string;
  children: React.ReactNode | React.ReactNode[];
}

export default function Button({ width, height, children }: ButtonProps) {
  return (
    <button
      className="RegularButton"
      style={
        width
          ? height
            ? { width: width, height: height }
            : { width: width }
          : height
          ? { height: height }
          : {}
      }>
      {children}
    </button>
  );
}
