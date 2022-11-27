import React from 'react';
import './ImageSlider.css';

interface ImageSliderProps {
  content: { image: string; title: string; id: number; color: string }[];
}

export default function ImageSlider({ content }: ImageSliderProps) {
  return (
    <div className="slider">
      {content.map((slide) => (
        <div className="card" style={{ background: slide.color }}>
          <img className="image" src={slide.image} alt="game" />
          <p className="title">{slide.title}</p>
        </div>
      ))}
    </div>
  );
}
