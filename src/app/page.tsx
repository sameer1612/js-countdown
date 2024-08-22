"use client";

import {
  differenceInMilliseconds,
  differenceInSeconds,
  Duration,
  intervalToDuration,
} from "date-fns";
import { useEffect, useState } from "react";

const dates = {
  engagement: "2024-05-26T14:52:00",
};

export default function Home() {
  const [duration, setDuration] = useState<Duration>({
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
            <span>{duration.years ?? 0} years</span>
            <span>{duration.months ?? 0} months</span>
            <span>{duration.days ?? 0} days</span>
          </div>
          <div className="justify-center flex gap-2">
            <span>{duration.hours ?? 0} hrs</span>
            <span>{duration.minutes ?? 0} mins</span>
            <span>{duration.seconds ?? 0} secs</span>
          </div>
        </div>
      </div>
    </main>
  );
}

function timeUntil(targetDate: string) {
  const now = new Date();
  const target = new Date(targetDate);

  const diff = Math.abs(differenceInMilliseconds(now, target));

  return intervalToDuration({
    start: 0,
    end: diff,
  });
}
