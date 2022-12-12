import React, { useState } from 'react';
import './ImageSlider.css';

interface ImageSliderProps {
  content: {
    image: string;
    title: string;
    id: number;
    color: string;
    description: string;
  }[];
  show: () => void;
  setGameTitle: React.Dispatch<React.SetStateAction<string>>;
  setGameDescription: React.Dispatch<React.SetStateAction<string>>;
}

export default function ImageSlider({
  content,
  show,
  setGameTitle,
  setGameDescription,
}: ImageSliderProps) {
  const updateInfoCard = (title, description) => {
    setGameTitle(title);
    setGameDescription(description);
    show();
  };

  return (
    <div className="slider">
      {content.map((slide, i) => (
        <div
          key={`${i}`}
          className="card"
          onClick={() => updateInfoCard(slide.title, slide.description)}
          style={{ background: slide.color }}>
          <img className="image" src={slide.image} alt="game" />
          <p className="title">{slide.title}</p>
        </div>
      ))}
    </div>
  );
}
