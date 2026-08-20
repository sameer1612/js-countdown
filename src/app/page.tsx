"use client";

import { differenceInWeeks } from "date-fns";
import { useEffect, useState } from "react";

const dates = {
  start: "2026-07-01T00:00:00",
};

const TOTAL_WEEKS = 40;

export default function Home() {
  const [elapsedWeeks, setElapsedWeeks] = useState(0);

  useEffect(() => {
    const update = () => {
      const weeks = Math.max(
        0,
        differenceInWeeks(new Date(), new Date(dates.start))
      );
      setElapsedWeeks(Math.min(weeks, TOTAL_WEEKS));
    };

    update();
    const interval = setInterval(update, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const remainingWeeks = TOTAL_WEEKS - elapsedWeeks;

  return (
    <main className="h-[80vh] lg:h-[90vh] flex flex-col justify-center items-center gap-y-48 p-4">
      <div className="pink-gradient backdrop-blur-2xl">
        <h1 className="text-5xl p-6">
          J<span className="opacity-50">yoti</span>
          <br />S<span className="opacity-50">ameer</span>
        </h1>
      </div>

      <div className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-semibold">Counting down the weeks</h2>
        <div className="flex gap-10">
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-bold">{elapsedWeeks}</span>
            <span className="text-sm opacity-50">weeks down</span>
          </div>
          <div className="flex flex-col items-center gap-1">
            <span className="text-4xl font-bold">{remainingWeeks}</span>
            <span className="text-sm opacity-50">weeks to go</span>
          </div>
        </div>
      </div>
    </main>
  );
}
