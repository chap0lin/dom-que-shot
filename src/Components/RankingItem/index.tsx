import React from "react";

interface RankingItemProps {
  position: number;
  name: string;
  time: string;
  children?: React.ReactNode | React.ReactNode[];
}

const RankingItem: React.FC<RankingItemProps> = (props) => {
  return(
    <div className="ranking-container">
          <div className="ranking-item">

            <div className="position">
              <div className="circle-border">
                <p>{props.position}º</p>
              </div>
            </div>

            <div className="infos">
              <p>{props.name}</p>
              <p>{props.time}</p>
            </div>

          </div>
        </div>
  );
}

export default RankingItem;
