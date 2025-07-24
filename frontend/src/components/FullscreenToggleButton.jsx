import { Maximize, Minimize } from "lucide-react";
import { useState } from "react";

function FullscreenToggleButton() {
  const [isFullscreen, setIsFullscreen] = useState(false);

  const handleToggleFullscreen = async () => {
    if (!document.fullscreenElement) {
      await document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      await document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <button
      className="cursor-pointer text-neutral"
      onClick={handleToggleFullscreen}
    >
      {isFullscreen ? <Minimize /> : <Maximize />}
    </button>
  );
}

export default FullscreenToggleButton;
