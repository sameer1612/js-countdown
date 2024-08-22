"use client";

import { useEffect, useState } from "react";

const dates = {
  engagement: "2024-05-26T14:52:00",
};

export default function Home() {
  const [duration, setDuration] = useState({
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setDuration(timeUntil(dates.engagement));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <main className="h-[80vh] lg:h-[90vh] flex flex-col justify-center items-center gap-y-48 p-4">
      <div className="blue-gradient backdrop-blur-2xl">
        <h1 className="text-5xl p-6">
          J<span className="opacity-50">yoti</span>
          <br />S<span className="opacity-50">ameer</span>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-4">
        <h2 className="text-2xl font-semibold">Engaged since</h2>
        <div className="justify-center text-sm opacity-50 flex flex-col gap-2">
          <div className="justify-center flex gap-2">
            <span>{duration.years} years</span>
            <span>{duration.months} months</span>
            <span>{duration.days} days</span>
          </div>
          <div className="justify-center flex gap-2">
            <span>{duration.hours} hrs</span>
            <span>{duration.minutes} mins</span>
            <span>{duration.seconds} secs</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function timeUntil(targetDate: string) {
  const now = new Date();
  const target = new Date(targetDate);

  let years = Math.abs(target.getFullYear() - now.getFullYear());
  let months = Math.abs(target.getMonth() - now.getMonth());
  let days = Math.abs(target.getDate() - now.getDate());
  let hours = Math.abs(target.getHours() - now.getHours());
  let minutes = Math.abs(target.getMinutes() - now.getMinutes());
  let seconds = Math.abs(target.getSeconds() - now.getSeconds());

  if (seconds < 0) {
    seconds += 60;
    minutes--;
  }
  if (minutes < 0) {
    minutes += 60;
    hours--;
  }
  if (hours < 0) {
    hours += 24;
    days--;
  }
  if (days < 0) {
    const lastMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    days += lastMonth.getDate();
    months--;
  }
  if (months < 0) {
    months += 12;
    years--;
  }

  return {
    years: years,
    months: months,
    days: days,
    hours: hours,
    minutes: minutes,
    seconds: seconds,
  };
}
