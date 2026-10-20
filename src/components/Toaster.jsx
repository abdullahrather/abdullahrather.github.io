import React, { useEffect, useRef, useState } from "react";
import { Icon } from "./Icons";
import { TOAST_EVENT } from "../lib/toast";

const Toaster = () => {
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const timer = useRef();

  useEffect(() => {
    const onToast = (e) => {
      setMessage(e.detail);
      setVisible(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setVisible(false), 2200);
    };
    window.addEventListener(TOAST_EVENT, onToast);
    return () => {
      window.removeEventListener(TOAST_EVENT, onToast);
      window.clearTimeout(timer.current);
    };
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-x-0 bottom-6 z-70 flex justify-center px-4 transition-all duration-500 ease-out-expo ${
        visible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
      }`}
    >
      {message && (
        <p className="flex items-center gap-2 rounded-full border border-line-strong bg-card-solid/90 px-4 py-2.5 text-sm shadow-2xl backdrop-blur-xl">
          <Icon name="check" className="size-4 text-ok" />
          {message}
        </p>
      )}
    </div>
  );
};

export default Toaster;
