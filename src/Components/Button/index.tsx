import React from 'react';
import './Button.css';

interface ButtonProps {
  width?: string;
  height?: string;
  onClick?: () => void;
  isDisabled?: boolean;
  children: React.ReactNode | React.ReactNode[];
}

export default function Button({
  width,
  height,
  onClick,
  children,
  isDisabled = false,
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
      }
      disabled={isDisabled}>
      {children}
    </button>
  );
}
