import React from 'react';
import './ImageSlider.css';

interface ImageSliderProps {
  content: { image: string; title: string; id: number }[];
}

export default function ImageSlider({ content }: ImageSliderProps) {
  return (
    <div className="slider">
      {content.map((slide, key) => (
        <div className="card">
          <img className="image" src={slide.image} alt="game" />
          <p className="title">{slide.title}</p>
        </div>
      ))}
    </div>
  );
}
