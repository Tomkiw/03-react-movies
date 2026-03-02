// src/Timer.tsx

import { useEffect, useState } from "react";

export default function Timer() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    setInterval(() => {
      setTime(new Date());
      console.log(`Interval - ${Date.now()}`);
    }, 1000);
  }, []);

  return <p>TimerBox - {time.toLocaleTimeString()}</p>;
}
