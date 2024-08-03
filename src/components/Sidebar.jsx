import React, { useState } from "react";
import Icon from "./Icon.jsx";
import { useCat } from "../context/CatContext.jsx";

export default function Sidebar() {
  const { moveCat, rotateCat, moveCatBack, goToRandomPosition, say, sayForSeconds, think, replayAction } = useCat();
  const [replayIndex, setReplayIndex] = useState(0);

  return (
    <div className="w-60 flex-none h-full overflow-y-auto flex flex-col items-start p-2 border-r border-gray-200">
      <div className="font-bold"> {"Events"} </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When "}
        <Icon name="flag" size={15} className="text-green-600 mx-2" />
        {"clicked"}
      </div>
      <div className="flex flex-row flex-wrap bg-yellow-500 text-white px-2 py-1 my-2 text-sm cursor-pointer">
        {"When this sprite clicked"}
      </div>
      <div className="font-bold"> {"Motion"} </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={moveCat}
      >
        {"Move 10 steps"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={moveCatBack}
      >
        {"Move 10 steps back"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => rotateCat(15)}
      >
        {"Turn "}
        <i className="fa-solid fa-rotate-left mx-2 my-1"></i>
        {"15 degrees"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => rotateCat(-15)}
      >
        {"Turn "}
        <i className="fa-solid fa-rotate-right mx-2 my-1"></i>
        {"-15 degrees"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={goToRandomPosition}
      >
        {"Go to random position"}
      </div>
      <div className="font-bold"> {"Look"} </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => say("Hey!")}
      >
        {"Say hey"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => sayForSeconds("Hey!", 2)}
      >
        {"Say hey for 2 seconds"}
      </div>
      <div
        className="flex flex-row flex-wrap bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer"
        onClick={() => think("Hmmm...")}
      >
        {"Think hmmm"}
      </div>
      <div className="font-bold"> {"Replay"} </div>
      <div className="flex flex-row items-center bg-green-500 text-white px-2 py-1 my-2 text-sm">
        <input
          type="number"
          min="0"
          value={replayIndex}
          onChange={(e) => setReplayIndex(Number(e.target.value))}
          className="w-16 px-2 py-1 text-black"
        />
        <div
          className="ml-2 cursor-pointer"
          onClick={() => replayAction(replayIndex)}
        >
          {"Replay action"}
        </div>
      </div>
    </div>
  );
}
