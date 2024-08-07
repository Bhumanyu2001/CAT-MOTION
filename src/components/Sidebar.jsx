import React, { useState } from "react";
import { useCat } from "../context/CatContext";

export default function Sidebar() {
  const {
    moveCat,
    rotateCat,
    moveCatBack,
    goToRandomPosition,
    say,
    sayForSeconds,
    think,
    replayAction,
    moveToInitialPosition,
    toggleVisibility,
    increaseSize,
    setSizePercentage
  } = useCat();

  const [replayIndex, setReplayIndex] = useState(0);
  const [moveSteps, setMoveSteps] = useState(10);
  const [moveBackSteps, setMoveBackSteps] = useState(10);
  const [sizePercentage, setSizePercentageValue] = useState(100);
  const [increaseSizeby, setIncreaseSizeby] = useState(10);

  return (
    <div className=" h-full p-2 bg-white relative z-10">
      <div className="w-70 h-full overflow-y-auto flex flex-col items-start p-4 border-r border-gray-300 shadow-lg relative z-50" >
      <div className="p-3 bg-blue-100 shadow-inner mb-4">
        <div className="font-bold text-lg mt-4 mb-4">Motion</div>
        <div className="flex flex-row items-center">
          <input
            type="number"
            min="0"
            value={moveSteps}
            onChange={(e) => setMoveSteps(Number(e.target.value))}
            className="w-16 px-2 py-1 text-black rounded border-2 border-gray-300 mr-2"
          />
          <div
            className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
            onClick={() => moveCat(moveSteps)}
          >
            {`Move ${moveSteps} steps`}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <input
            type="number"
            min="0"
            value={moveBackSteps}
            onChange={(e) => setMoveBackSteps(Number(e.target.value))}
            className="w-16 px-2 py-1 text-black rounded border-2 border-gray-300 mr-2"
          />
          <div
            className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
            onClick={() => moveCatBack(moveBackSteps)}
          >
            {`Move back ${moveBackSteps} steps`}
          </div>
        </div>
        <div
          className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={() => rotateCat(15)}
        >
          {"Turn "}
          <i className="fa-solid fa-rotate-left mx-2 my-1"></i>
          {"15 degrees"}
        </div>
        <div
          className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={() => rotateCat(-15)}
        >
          {"Turn "}
          <i className="fa-solid fa-rotate-right mx-2 my-1"></i>
          {"-15 degrees"}
        </div>
        <div
          className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={goToRandomPosition}
        >
          {"Go to random position"}
        </div>
        <div
          className="flex flex-row items-center bg-blue-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={moveToInitialPosition}
        >
          {"Move to Initial Position"}
        </div>
      </div>
      <div className="p-3 bg-blue-100 shadow-inner w-full mb-4">
        <div className="font-bold text-lg mt-4 mb-4">Look</div>
        <div
          className="flex flex-row items-center bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={() => say("Hey!")}
        >
          {"Say hey"}
        </div>
        <div
          className="flex flex-row items-center bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={() => sayForSeconds("Hey!", 2)}
        >
          {"Say hey for 2 seconds"}
        </div>
        <div
          className="flex flex-row items-center bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={() => think("Hmmm...")}
        >
          {"Think hmmm"}
        </div>
        <div
          className="flex flex-row items-center bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
          onClick={toggleVisibility}
        >
          {"Toggle Cat Visibility"}
        </div>
        <div className="flex flex-row items-center">
          <input
            type="number"
            min="0"
            value={increaseSizeby}
            onChange={(e) => setIncreaseSizeby(Number(e.target.value))}
            className="w-16 px-2 py-1 text-black rounded border-2 border-gray-300 mr-2"
          />
          <div
            className="flex flex-row items-center bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
            onClick={() => increaseSize(increaseSizeby)}
          >
            {"Increase Cat Size"}
          </div>
        </div>
        <div className="flex flex-row items-center">
          <input
            type="number"
            min="0"
            value={sizePercentage}
            onChange={(e) => setSizePercentageValue(Number(e.target.value))}
            className="w-16 px-2 py-1 text-black rounded border-2 border-gray-300 mr-2"
          />
          <div
            className="flex flex-row items-center bg-purple-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
            onClick={() => setSizePercentage(sizePercentage)}
          >
            {"Set Size Percentage"}
          </div>
        </div>
      </div>
      <div className="p-3 bg-blue-100 shadow-inner w-full mb-4">
        <div className="font-bold text-lg mt-4 mb-4">Replay</div>
        <div className="flex flex-row items-center">
          <input
            type="number"
            min="0"
            value={replayIndex}
            onChange={(e) => setReplayIndex(Number(e.target.value))}
            className="w-16 px-2 py-1 text-black rounded border-2 border-gray-300 mr-2"
          />
          <div
            className="flex flex-row items-center bg-green-500 text-white px-2 py-1 my-2 text-sm cursor-pointer rounded shadow"
            onClick={() => replayAction(replayIndex)}
          >
            {"Replay action"}
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}