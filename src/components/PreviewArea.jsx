// src/components/PreviewArea.js
import React from 'react';
import CatSprite from './CatSprite';
import { useCat } from '../context/CatContext';

export default function PreviewArea() {
  const { position, rotation, message } = useCat();

  return (
    <div className="flex-none h-full  overflow-visible p-2 relative">
      <CatSprite x={position.x} y={position.y} rotation={rotation} message={message} />
    </div>
  );
}
