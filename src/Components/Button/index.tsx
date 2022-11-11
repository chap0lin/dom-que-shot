import React from 'react';
import './Button.css';

interface ButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  children: React.ReactNode | React.ReactNode[];
}

export default function Button({
  width,
  height,
  onClick,
  children,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
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
