import { useState, useEffect } from "react";

export const Toast = ({ message, type }) => {
  const [visible, setVisible] = useState(true);

  console.log(visible);
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-2 left-[50%] translate-x-[-50%] px-2 p-2 rounded ${type === "success" ? "bg-green-500" : "bg-red-500"} text-white`}
    >
      {message}
    </div>
  );
};
