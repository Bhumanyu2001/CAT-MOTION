// src/components/DraggableCat.js
import React from 'react';
import Draggable from 'react-draggable';
import CatSprite from './CatSprite';
import { useCat } from '../context/CatContext';

const DraggableCat = () => {
  const { position, rotation, message, isVisible, catSize, moveCat } = useCat();

  const handleDrag = (e, ui) => {
    moveCat({ x: position.x + ui.deltaX, y: position.y + ui.deltaY });
  };

  return (
    <Draggable
      position={{ x: position.x, y: position.y }}
      onDrag={handleDrag}
      bounds="parent"
    >
      <div style={{ position: 'absolute' }}>
        {isVisible && (
          <CatSprite
            x={0} // x and y are handled by Draggable
            y={0}
            message={message}
            rotation={rotation}
            size={catSize}
          />
        )}
      </div>
    </Draggable>
  );
};

export default DraggableCat;
