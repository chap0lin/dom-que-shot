import './GameCard.css';

interface GameCardProps {
  onClick?: () => void;
  id: string | number;
  title: string;
  image: string;
  backgroundColor: string;
}

export default function GameCard({
  onClick,
  id,
  title,
  image,
  backgroundColor,
}: GameCardProps) {
  return (
    <div
      onClick={onClick}
      key={id}
      className="CardBackground"
      style={{ background: backgroundColor }}>
      <img className="CardImage" src={image} alt={title} />
      <p className="CardTitle">{title}</p>
    </div>
  );
}
