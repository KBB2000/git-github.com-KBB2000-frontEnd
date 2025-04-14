import { useEffect, useState } from "react";

const Timer = ({ duration, onExpire }) => {
  const [time, setTime] = useState(duration);

  useEffect(() => {
    if (time === 0) {
      onExpire();
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return <div className="text-lg font-semibold text-red-600">⏱️ {time}s</div>;
};

export default Timer;
