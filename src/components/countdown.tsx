import React, { useEffect, useState } from 'react';

// example for component updates, react function components, setState hooks.

const useNow = () => {
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return now;
}


const Clock = () => {
  const now = useNow();

  return (
    <>
      <h3>Clock</h3>
      <div>{now.toLocaleString()}</div>
    </>
  );
}


interface Props {
  wakeMeAt: Date
};

const useAlarm = ({ wakeMeAt }: Props) => {
  // gets access to setNow without 
  const [, setNow] = useState<Date>();
  // gets ms of date to run
  const wakeMeAtMS = wakeMeAt.getTime();
  // this log runs twice because ${wakeMeAtMS} is the same value and the second time its 
  // already waiting inside the first useEffect so the function exits
  // defered execution
  console.log('In useAlarm: ', wakeMeAt)

  // (function, array) of values the effect depends on
  // 
  useEffect(() => {
    console.log("Inside useEffect: ")
    const now = new Date();
    const nowMS = now.getTime();

    if (wakeMeAtMS > nowMS) {
      const ms = wakeMeAtMS - nowMS;

      const timeoutId = setTimeout(() => {
        setNow(now);
      }, ms);

      return () => {
        clearTimeout(timeoutId);
      };
    }

  }, [wakeMeAtMS]);
}

const nextMonth = () => {
  const now = new Date();

  if (now.getMonth() < 11) {
    return new Date(now.getFullYear(), now.getMonth() + 1);
  } else {
    return new Date(now.getFullYear() + 1, 0);
  }
}

const greetingMessage = (now: Date) => {
  const month = now.getMonth() + 1;

  if (month <= 1) {
    return `Happy new Year!!! ${now.getFullYear()} will be amazing!`
  }
  if (month >= 11) {
    return `Counting down to the ${now.getFullYear() + 1} year!!!`
  }
  return "This app is usually not used this time of the year, so come back later.";
}

const NewYearCountdown = () => {
  const now = useNow();
  const nextYear = now.getFullYear() + 1;
  const turnaroundTime = new Date(nextYear, 0, 1, 0, 0, 0, 0);
  const countdown = Math.trunc((turnaroundTime.getTime() - now.getTime()) / 1000);
  const countdownSec = countdown % 60;
  const countdownMin = Math.trunc(countdown / 60 % 60);
  const countdownHours = Math.trunc(countdown / (60 * 60) % 24);
  const countdownDays = Math.trunc(countdown / (60 * 60 * 24));

  return (
    <div>
      <h3>Count down to {nextYear}</h3>
      <div>{countdownDays} days</div>
      <div>{countdownHours} hours</div>
      <div>{countdownMin} minutes</div>
      <div>{countdownSec} seconds</div>
    </div>
  );
}

const Countdown = () => {
  const message = greetingMessage(new Date());
  useAlarm({ wakeMeAt: nextMonth() });

  return (
    <div className="App-container">
      <h1>Happy New Year</h1>
      <h3>{message}</h3>
      <div className="App-components">
        <Clock />
        <NewYearCountdown />
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Countdown;