"use client";
import { type FC, useState } from "react";
import "./Counter.css";

const Counter: FC = () => {
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(5);
  const [history, setHistory] = useState<ILog[]>([]);

  function handler() {
    const newTotal = total + step;
    const log = {
      date: Date.now(),
      step,
      total: newTotal,
      prew: total,
    };

    setTotal(newTotal);
    setHistory((h) => [...h, log]);
  }

  return (
    <div className="counter-container">
      <header></header>
      <main>
        <div className="hint">Click to the button to add {step}</div>
        <button className="main-button" onClick={handler}>
          {total}
        </button>
        <div className="step-controls">
          <button
            className="step-btn decrement"
            onClick={() => setStep((s) => s - 1)}
          >
            -
          </button>
          <div className="step-value">{step > 0 ? "+" + step : step}</div>
          <button
            className="step-btn increment"
            onClick={() => setStep((s) => s + 1)}
          >
            +
          </button>
        </div>
      </main>
      <footer>
        {history
          .map((log) => {
            return (
              <div className="log">
                {/* <div>
                  <span>
                    {new Date(log.date).toLocaleDateString()}
                  </span>
                </div> */}
                <div>
                  <span>{log.prew}</span>
                  <span>{log.step > 0 ? " + " + log.step : log.step}</span>
                  <span>{" = " + log.total}</span>
                </div>
                <div>
                  <span>
                    {new Date(log.date).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                      second: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            );
          })
          .reverse()}
      </footer>
    </div>
  );
};

export default Counter;

interface ILog {
  date: number;
  step: number;
  total: number;
  prew: number;
}

