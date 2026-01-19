"use client";
import { FC, useState, useRef, useEffect } from "react";
import "./Counter.css";

const Counter: FC = () => {
  const [title, setTitle] = useState("...");
  const [total, setTotal] = useState(0);
  const [step, setStep] = useState(5);
  const [history, setHistory] = useState<ILog[]>([]);
  const historyEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setTitle("json + " + JSON.stringify(window.Telegram?.WebApp?.initDataUnsafe?.user, null, 2));
  }, []);
  // Автоскролл к последнему элементу истории
  useEffect(() => {
    historyEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

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
      {/* Основной контент по центру экрана */}
      <div className="main-content">
        <div className="header">
          <h1>{title}</h1>
          <p className="subtitle">Click the button to add {step}</p>
        </div>

        {/* Центральная кнопка с контролом шага */}
        <div className="counter-controls">
          <div className="controls-wrapper">
            {/* Главная кнопка */}
            <button onClick={handler} className="main-button">
              {total}
            </button>

            {/* Контрол шага */}
            <div className="step-controls">
              <button
                onClick={() => setStep((s) => s + 1)}
                className="step-btn step-increment"
              >
                +
              </button>
              <div className="step-value">{step}</div>
              <button
                onClick={() => setStep((s) => s - 1)}
                className="step-btn step-decrement"
              >
                -
              </button>
            </div>
          </div>

          {/* Текущее состояние */}
          <div className="current-state">
            <p>
              Current value: <span className="total-value">{total}</span>
            </p>
            <p className="step-info">Each click adds {step}</p>
          </div>
        </div>
      </div>

      {/* Панель истории */}
      <div className="history-panel">
        <div className="history-header">
          <h2>Operation History</h2>
          <span className="history-count">{history.length} records</span>
        </div>

        {/* Контейнер для скролла истории */}
        <div className="history-scroll-container">
          {history.length === 0 ? (
            <div className="empty-history">
              History is empty. Click the button to start!
            </div>
          ) : (
            <div className="history-list">
              {history.map((log) => (
                <div key={log.date} className="history-item">
                  <div className="history-item-content">
                    <div className="history-time">
                      {new Date(log.date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </div>
                    <div className="history-operation">
                      <span className="prev-value">{log.prew}</span>
                      <span
                        className={`operation-sign ${
                          log.step >= 0 ? "positive" : "negative"
                        }`}
                      >
                        {log.step >= 0 ? "+" : ""}
                        {log.step}
                      </span>
                      <span className="equals">=</span>
                      <span className="new-value">{log.total}</span>
                    </div>
                    <div className="history-date">
                      {new Date(log.date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              ))}
              {/* Якорь для автоскролла */}
              <div ref={historyEndRef} className="history-anchor" />
            </div>
          )}
        </div>
      </div>
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
