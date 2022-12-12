import { useState, useEffect } from 'react';
import api from '../../../services/api';
import './PingTracker.css';

enum Visibility {
  Invisible,
  Visible,
}

export default function PingTracker() {
  let clickCount = 0;

  const [pingText, setPingText] = useState('ping: --');
  const [backColor, setBackColor] = useState('#123456');
  const [pingVisibility, setPingVisibility] = useState<Visibility>(
    Visibility.Invisible
  );

  useEffect(() => {
    const ping = setInterval(getPing, 1000);
    return () => {
      clearInterval(ping);
    };
  }, []);

  const getPing = () => {
    const date1 = new Date();
    const ti = date1.getTime();
    api
      .get(`/ping`)
      .then(() => {
        const date2 = new Date();
        const tf = date2.getTime();
        setPingText(`ping: ${tf - ti}ms`);
        setBackColor('#123456');
      })
      .catch((err) => {
        setPingText(`Servidor indisponível (${err})`);
        setBackColor('firebrick');
      });
    return;
  };

  const togglePing = () => {
    if (clickCount === 0) {
      setTimeout(() => {
        if (clickCount >= 2) {
          clickCount = 0;
          if (pingVisibility === Visibility.Invisible) {
            return setPingVisibility(Visibility.Visible);
          }
          return setPingVisibility(Visibility.Invisible);
        }
        clickCount = 0;
      }, 500);
    }
    clickCount += 1;
  };

  return (
    <div
      onClick={togglePing}
      className="PingDiv"
      style={
        pingVisibility === Visibility.Visible
          ? { opacity: 1, backgroundColor: backColor }
          : { opacity: 0 }
      }>
      {pingText}
    </div>
  );
}
