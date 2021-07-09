import { useState, useEffect, useRef } from "react";

import "./Time.css";

const Time = () => {
  let [hours, setHour] = useState(0);
  let [minutes, setMinutes] = useState(0);
  let [seconds, setSeconds] = useState(0);
  let [disabled, setDisabled] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const intervalRef = useRef();

  useEffect(() => {
    if (isStart) {
      intervalRef.current = setInterval(() => {
        setSeconds(seconds++);
        setMinutes(minutes);
        setHour(hours);
        if (seconds === 60) {
          seconds = 0;
          minutes++;
        }
        if (minutes === 60) {
          minutes = 0;
          hours++;
        }
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
  }, [isStart]);

  const startHandler = () => {
    seconds++;
    setIsStart(true);
    setDisabled(true);
  };

  const stopHandler = () => {
    setDisabled(false);
    setIsStart(false);
    setSeconds(0);
    setMinutes(0);
    setHour(0);
  };

  const waitHandler = () => {
    setDisabled(false);
    setIsStart(false);
  };

  const resetHandler = () => {
    setIsStart(false);
    setSeconds(0);
    setMinutes(0);
    setHour(0);
    setTimeout(() => {
      setIsStart(true);
    }, 1);
  };

  return (
    <div>
      <div className="numbers-block">
        <div className="numbers">{hours}</div>
        <div className="numbers">{minutes}</div>
        <div className="numbers">{seconds}</div>
      </div>
      <div className="buttons-block">
        <button onClick={startHandler} disabled={disabled}>
          Start
        </button>
        <button onClick={stopHandler}>Stop</button>
        <button onDoubleClick={waitHandler}>Wait</button>
        <button onClick={resetHandler}>Reset</button>
      </div>
    </div>
  );
};

export default Time;
