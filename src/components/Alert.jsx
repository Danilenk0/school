import React, { useEffect, useState } from "react";

export default function Alert({ message, type, handleClearAlert }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      handleClearAlert({ type: "", message: "" });
    }, 3000);

    return () => clearTimeout(timer);
  }, [message]);

  useEffect(() => {
    if (message) {
      setVisible(true);
    }
  }, [message]);

  if (!visible) return null;
  const alertStyle =
    type === "success"
      ? "bg-green-100 text-green-700"
      : "bg-red-100 text-red-700";

  return (
    <div
      className={`flex rounded-lg p-4 mb-4 text-sm fixed w-1/2 bottom-2 z-30 align-baseline gap-4 j left-1/2 -translate-x-1/2 ${alertStyle}`}
      role="alert"
    >
      <i className="bx bx-error-circle self-center"></i>
      <div>{message}</div>
    </div>
  );
}
