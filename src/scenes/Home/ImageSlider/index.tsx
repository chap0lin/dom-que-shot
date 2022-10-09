import React from 'react';
import { Link } from 'react-router-dom';
import './ImageSlider.css';

interface ImageSliderProps {
  content: { image; title }[]; //dando warning porque estou usando este any, mas eu não tenho certeza
}

export default function ImageSlider({ content }: ImageSliderProps) {
  return (
    <div className="slider">
      {content.map((slide) => {
        return (
          <Link to="/GeneralRoom">
            <div className="card">
              <img className="image" src={slide.image} alt={`game`} />
              <p className="title">{slide.title}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
