import toast from "react-hot-toast";

const successSound = new Audio("/sounds/success.mp3");
const errorSound = new Audio("/sounds/error.mp3");

successSound.volume = 0.09;
errorSound.volume = 0.03;

const playSound = (sound, startTime = 0) => {
  sound.currentTime = startTime;
  sound.play().catch((e) => {
    console.warn("Sound play blocked by browser:", e);
  });
};

const patchToast = () => {
  const originalSuccess = toast.success;
  const originalError = toast.error;

  toast.success = (message, options) => {
    playSound(successSound, 0.7);
    return originalSuccess(message, options);
  };

  toast.error = (message, options) => {
    playSound(errorSound, 0.1);
    return originalError(message, options);
  };
};

export default patchToast;
