"use client";

import {
  addDays,
  differenceInCalendarDays,
  differenceInWeeks,
  format,
} from "date-fns";
import { Fraunces } from "next/font/google";
import { useEffect, useState } from "react";

const serif = Fraunces({ subsets: ["latin"], style: ["normal", "italic"] });

const dates = {
  start: "2026-07-01T00:00:00",
};

// Ultrasound reading: 16w 1d on 31 Oct 2026
const usg = {
  date: "2026-10-31T00:00:00",
  weeks: 16,
  days: 1,
};

const TOTAL_WEEKS = 40;
const TOTAL_DAYS = TOTAL_WEEKS * 7;

const usgStart = addDays(new Date(usg.date), -(usg.weeks * 7 + usg.days));
const usgDueDate = addDays(usgStart, TOTAL_DAYS);

const sizes: Record<number, [string, string]> = {
  4: ["a poppy seed", "🌱"],
  5: ["a sesame seed", "🌱"],
  6: ["a lentil", "🌱"],
  7: ["a blueberry", "🫐"],
  8: ["a raspberry", "🍓"],
  9: ["a cherry", "🍒"],
  10: ["a strawberry", "🍓"],
  11: ["a lime", "🍋"],
  12: ["a plum", "🍑"],
  13: ["a peach", "🍑"],
  14: ["a lemon", "🍋"],
  15: ["an apple", "🍎"],
  16: ["an avocado", "🥑"],
  17: ["a pomegranate", "🍎"],
  18: ["a bell pepper", "🫑"],
  19: ["a mango", "🥭"],
  20: ["a banana", "🍌"],
  21: ["a carrot", "🥕"],
  22: ["a papaya", "🥭"],
  23: ["a grapefruit", "🍊"],
  24: ["a cantaloupe", "🍈"],
  25: ["a cauliflower", "🥦"],
  26: ["a lettuce", "🥬"],
  27: ["a cabbage", "🥬"],
  28: ["an eggplant", "🍆"],
  29: ["a butternut squash", "🎃"],
  30: ["a cucumber", "🥒"],
  31: ["a coconut", "🥥"],
  32: ["a sweet potato", "🍠"],
  33: ["a pineapple", "🍍"],
  34: ["a melon", "🍈"],
  35: ["a honeydew", "🍈"],
  36: ["a papaya", "🥭"],
  37: ["a bunch of chard", "🥬"],
  38: ["a leek", "🥬"],
  39: ["a watermelon", "🍉"],
  40: ["a pumpkin", "🎃"],
};

const plural = (n: number, word: string) => `${n} ${word}${n === 1 ? "" : "s"}`;

const trimester = (weeks: number) =>
  weeks < 13
    ? "First trimester"
    : weeks < 27
      ? "Second trimester"
      : "Third trimester";

export default function Home() {
  const [ready, setReady] = useState(false);
  const [elapsedWeeks, setElapsedWeeks] = useState(0);
  const [usgElapsedDays, setUsgElapsedDays] = useState(0);

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const weeks = Math.max(0, differenceInWeeks(now, new Date(dates.start)));
      setElapsedWeeks(Math.min(weeks, TOTAL_WEEKS));

      const days = Math.max(0, differenceInCalendarDays(now, usgStart));
      setUsgElapsedDays(Math.min(days, TOTAL_DAYS));
      setReady(true);
    };

    update();
    const interval = setInterval(update, 1000 * 60);

    return () => clearInterval(interval);
  }, []);

  const remainingWeeks = TOTAL_WEEKS - elapsedWeeks;
  const weeks = Math.floor(usgElapsedDays / 7);
  const days = usgElapsedDays % 7;
  const daysLeft = TOTAL_DAYS - usgElapsedDays;
  const progress = (usgElapsedDays / TOTAL_DAYS) * 100;
  const size = sizes[Math.max(4, weeks)];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-14 px-5 py-16">
      <div className="pink-gradient backdrop-blur-2xl">
        <h1 className="text-5xl p-6">
          J<span className="opacity-50">yoti</span>
          <br />S<span className="opacity-50">ameer</span>
        </h1>
      </div>

      <section
        className={`w-full max-w-md rounded-[2rem] bg-white/60 shadow-[0_20px_60px_-20px_rgba(219,112,147,0.35)] ring-1 ring-pink-100 backdrop-blur px-7 py-9 text-center transition-opacity duration-700 ${
          ready ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="text-sm tracking-wide text-pink-400">Our little one is</p>

        <p className={`${serif.className} mt-2 text-5xl font-semibold`}>
          {weeks}
          <span className="text-2xl font-normal opacity-60"> weeks</span>
          {days > 0 && (
            <>
              {" "}
              {days}
              <span className="text-2xl font-normal opacity-60">
                {" "}
                {days === 1 ? "day" : "days"}
              </span>
            </>
          )}
        </p>

        {size && (
          <p className="mt-4 text-base opacity-80">
            about the size of {size[0]}{" "}
            <span className="text-xl">{size[1]}</span>
          </p>
        )}

        <div className="mt-9">
          <div className="relative h-2.5 rounded-full bg-pink-100">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-pink-200 to-pink-400 transition-[width] duration-1000"
              style={{ width: `${progress}%` }}
            />
            <span
              className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 text-lg animate-heartbeat"
              style={{ left: `${progress}%` }}
            >
              💗
            </span>
          </div>
          <div className="mt-3 flex justify-between text-xs opacity-50">
            <span>Day one</span>
            <span>{trimester(weeks)}</span>
            <span>Hello, baby</span>
          </div>
        </div>

        <div className="mt-8 border-t border-pink-100 pt-6">
          <p className={`${serif.className} text-lg italic`}>
            {daysLeft > 0
              ? `${plural(daysLeft, "day")} until we meet`
              : "Any day now 💕"}
          </p>
          <p className="mt-1 text-sm opacity-50">
            Due {format(usgDueDate, "d MMMM yyyy")}
          </p>
        </div>
      </section>

      <p
        className={`text-sm opacity-50 transition-opacity duration-700 ${
          ready ? "" : "opacity-0"
        }`}
      >
        {plural(elapsedWeeks, "week")} together · {remainingWeeks} to go
      </p>
    </main>
  );
}
