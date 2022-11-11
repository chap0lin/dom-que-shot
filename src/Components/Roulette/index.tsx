import React from 'react';
import './Roulette.css';

interface RouletteProps {
  children: React.ReactNode | React.ReactNode[];
}

export default function Roulette({ children }: RouletteProps) {
  return (
    <div className="Roulette">
      <div className="RouletteDetail Upper" />
      <div className="RouletteCenter">{children}</div>
      <div className="RouletteDetail Lower" />
    </div>
  );
}
