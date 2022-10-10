import React from 'react';
import './Background.css';

interface BackgroundProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function (props: BackgroundProps) {
  return <div className="AppBackground">{props.children}</div>;
}
