import React, { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  function transition(newmode, replace = false) {
    setMode(newmode);
    if (!replace) {
      const updatedHistory = [...history];
      setMode(newmode);
      updatedHistory.push(newmode);
    } else {
      setMode(newmode);
    }
  }
  function back() {
    if (history.length > 1) {
      const updatedHistory = [...history];
      updatedHistory.pop();
      setHistory(() => [...updatedHistory])
      setMode(history[history.length - 1]);
    }
  }

  return { mode, transition, back };
}
