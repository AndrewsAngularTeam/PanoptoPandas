import { createContext, useContext, useEffect } from "react";
import { useStopwatch } from "react-timer-hook";

const TimingContext = createContext({
  start: () => {},
  pause: () => {},
  reset: () => {},
  elapsedTime: {
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
});

export const useTimer = () => useContext(TimingContext);

export const TimingProvider = ({ children }) => {
  const { seconds, minutes, hours, days, isRunning, start, pause, reset } = useStopwatch({ autoStart: false });

  useEffect(() => {
    if (seconds == 10) {
      console.log("Get 10 credit");
      resetTimer();
    }
  }, [seconds]);

  function playtimer() {
    console.log("timer start");
    start();
  }

  function pauseTimer() {
    console.log("timer paused");
    pause();
  }

  function resetTimer() {
    console.log("timer reset");
    reset();
  }
  return (
    <TimingContext.Provider
      value={{
        start: playtimer,
        pause: pauseTimer,
        reset: resetTimer,
        elapsedTime: { days, hours, minutes, seconds },
      }}
      children={children}
    />
  );
};
