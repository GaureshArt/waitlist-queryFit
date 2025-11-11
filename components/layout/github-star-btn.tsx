"use client"

import { useEffect, useState } from "react";
import StarSvg from "../svgs/star";

export function GithubStarButton() {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    fetch("https://api.github.com/repos/GaureshArt/query.fit")
      .then(res => res.json())
      .then(data => setStars(data.stargazers_count));
  }, []);

  return (
    <a
      href="https://github.com/GaureshArt/query.fit"
      target="_blank"
      className="inline-flex mb-8 items-center gap-2 rounded-md border px-3 py-1.5 text-sm font-medium hover:bg-accent transition"
    >
      <StarSvg/>
      <span className="text-sm font-cutive-mono font-bold tracking-tighter">Star</span>
      {stars !== null && (
        <span className="text-xs opacity-70 font-mono">{stars}</span>
      )}
    </a>
  );
}
