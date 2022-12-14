import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newmode, replace = false) {
    if (replace) {
      setHistory((prev) => [...prev.slice(0, -1), newmode]);
    } else {
      setHistory((prev) => [...prev, newmode]);
    }
  }
  function back() {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  }

  return { mode: history[history.length - 1], transition, back };
}