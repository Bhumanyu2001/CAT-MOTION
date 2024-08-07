import React from "react";
import CatSprite from "./CatSprite";
import { useCat } from "../context/CatContext";

export default function PreviewArea() {
  const { position, rotation, message, isVisible, catSize, setPosition } = useCat();

  const handleStop = (e, data) => {
    setPosition({ x: data.x, y: data.y });
  };

  return (
    <div className="flex-none h-full overflow-visible p-2 relative">
      {isVisible && (
        <CatSprite
          x={position.x}
          y={position.y}
          message={message}
          rotation={rotation}
          size={catSize}
          onStop={handleStop} // Pass handleStop to CatSprite
        />
      )}
    </div>
  );
}
