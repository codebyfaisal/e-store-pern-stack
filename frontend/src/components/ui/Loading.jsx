import React from "react";

const Loading = ({ message = "" }) => {
  const text = "E - STORE";

  return (
    <>
      <style>{`
        .fade-in-out {
          animation: fadeInOut 1.5s ease-in-out infinite alternate;
        }

        @keyframes fadeInOut {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>

      <div className="flex flex-col justify-center items-center h-full">
        <div className="flex text-3xl font-semibold text-primary">
          {text.split("").map((char, index) => (
            <span
              key={index}
              className="fade-in-out"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </div>
        <div className="font-semibold text-primary text-center mt-4">{message}</div>
      </div>
    </>
  );
};

export default Loading;
