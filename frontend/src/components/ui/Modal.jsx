// import React from "react";
// const Modal = ({ isOpen, onClose, children, modalId }) => {
//   return (
//     <>
//       <input
//         type="checkbox"
//         id={modalId}
//         className="modal-toggle"
//         checked={isOpen}
//         readOnly
//       />
//       <div className="modal modal-bottom sm:modal-middle">
//         <div className="modal-box">{children}</div>
//       </div>
//     </>
//   );
// };

// export default Modal;

// components/Modal.jsx
import React, { useEffect } from "react";

const Modal = ({ isOpen, onClose, children }) => {
  // Close modal on "Escape" key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000000] flex items-center justify-center bg-base-100/50">
      <div className="w-full max-w-md mx-4 rounded-lg shadow-lg p-6 relative">
        <div className="absolute top-0 left-0 w-full h-full bg-white/90 backdrop-blur-xl blur-3xl z-[-1]"></div>
        <div className="z-[2]">
          {children}
          <button
            className="absolute top-2 right-5 cursor-pointer hover:text-content text-3xl"
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
