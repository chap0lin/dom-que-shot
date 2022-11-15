import React from "react";
import "./styles.css";
interface RankingItemProps {
  position: number;
  name: string;
  time: string;
}

const RankingItem: React.FC<RankingItemProps> = ({position, name, time}) => {
  return(
    <div id="ranking-item">
      <div className="position">
        <div className="circle-border">
          <p>{position+1}º</p>
        </div>
      </div>
      <div className="infos">
        <p>{name}</p>
        <p>{time}</p>
      </div>
    </div>
  );
}

export default RankingItem;
