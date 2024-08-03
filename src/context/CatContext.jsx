import React, { createContext, useState, useContext } from "react";

const CatContext = createContext();

export const CatProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  const [actionHistory, setActionHistory] = useState([]);

  const addToHistory = (type, params) => {
    setActionHistory((prev) => [...prev, { type, params }]);
  };

  const moveCat = () => {
    const radians = (rotation * Math.PI) / 180;
    const newPosition = {
      x: position.x + 10 * Math.cos(radians),
      y: position.y + 10 * Math.sin(radians),
    };
    setPosition(newPosition);
    addToHistory("move", newPosition);
  };

  const rotateCat = (angle) => {
    const newRotation = rotation + angle;
    setRotation(newRotation);
    addToHistory("rotate", { rotation: newRotation });
  };

  const moveCatBack = () => {
    const radians = (rotation * Math.PI) / 180;
    const newPosition = {
      x: position.x - 10 * Math.cos(radians),
      y: position.y - 10 * Math.sin(radians),
    };
    setPosition(newPosition);
    addToHistory("moveBack", newPosition);
  };

  const goToRandomPosition = () => {
    const randomX = Math.floor(Math.random() * 300);
    const randomY = Math.floor(Math.random() * 600);
    const newPosition = { x: randomX, y: randomY };
    setPosition(newPosition);
    addToHistory("randomPosition", newPosition);
  };

  const say = (text) => {
    setMessage(text);
    addToHistory("say", { message: text, duration: 2000 });
    setTimeout(() => setMessage(""), 2000);
  };

  const sayForSeconds = (text, seconds) => {
    setMessage(text);
    addToHistory("sayForSeconds", { message: text, duration: seconds * 1000 });
    setTimeout(() => setMessage(""), seconds * 1000);
  };

  const think = (text) => {
    setMessage(text);
    addToHistory("think", { message: text, duration: 2000 });
    setTimeout(() => setMessage(""), 2000);
  };

  const replayAction = (n) => {
    if (n >= 0 && n <= actionHistory.length) {
      // Reset position, rotation, and message
      setPosition({ x: 0, y: 0 });
      setRotation(0);
      setMessage("");
  
      let totalDelay = 0;
  
      // Replay actions up to the specified index
      actionHistory.slice(0, n).forEach((action, index) => {
        setTimeout(() => {
          switch (action.type) {
            case "move":
            case "moveBack":
            case "randomPosition":
              setPosition(action.params);
              break;
            case "rotate":
              setRotation(action.params.rotation);
              break;
            case "say":
            case "sayForSeconds":
            case "think":
              setMessage(action.params.message);
              setTimeout(() => setMessage(""), action.params.duration);
              break;
            default:
              break;
          }
        }, totalDelay);
        
        // Add a delay between actions
        if (action.type === "say" || action.type === "sayForSeconds" || action.type === "think") {
          totalDelay += action.params.duration; // Duration of the message
        } else {
          totalDelay += 1000; // Adjust this delay to match the natural pace of movements
        }
      });
    }
  };
  

  return (
    <CatContext.Provider
      value={{
        position,
        rotation,
        message,
        moveCat,
        rotateCat,
        moveCatBack,
        goToRandomPosition,
        say,
        sayForSeconds,
        think,
        replayAction,
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCat = () => useContext(CatContext);
