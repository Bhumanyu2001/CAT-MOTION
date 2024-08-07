import React, { createContext, useState, useContext } from "react";

const CatContext = createContext();

export const CatProvider = ({ children }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState(0);
  const [message, setMessage] = useState("");
  const [actionHistory, setActionHistory] = useState([]);
  const [isVisible, setIsVisible] = useState(true);
  const [catSize, setCatSize] = useState(100);

  const addToHistory = (type, params) => {
    setActionHistory((prev) => [...prev, { type, params }]);
  };

  const moveCat = (num) => {
    const radians = (rotation * Math.PI) / 180;
    const newPosition = {
      x: position.x + num * Math.cos(radians),
      y: position.y + num * Math.sin(radians),
    };
    setPosition(newPosition);
    addToHistory("move", newPosition);
  };

  const moveToInitialPosition = () => {
    setPosition({ x: 0, y: 0 });
    addToHistory("move", { x: 0, y: 0 });
    setRotation(0);
    addToHistory("rotate", 0);
    setMessage("");
    addToHistory("say", "");
    addToHistory("think", "");
    setIsVisible(true);
    setCatSize(100);
    addToHistory("setSizePercentage", 100);
  }

  const rotateCat = (angle) => {
    const newRotation = rotation + angle;
    setRotation(newRotation);
    addToHistory("rotate", { rotation: newRotation });
  };

  const moveCatBack = (num) => {
    const radians = (rotation * Math.PI) / 180;
    const newPosition = {
      x: position.x - num * Math.cos(radians),
      y: position.y - num * Math.sin(radians),
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
    console.log("say", text);
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
  
  const toggleVisibility = () => {
    setIsVisible((prev) => !prev); // Toggle visibility state
  };

  const increaseSize = (num) => {
    setCatSize((prevSize) => Math.max(prevSize + num, 0)); // Prevent size from going below 0
    addToHistory("increaseSize", { size: Math.max(catSize + num, 0) });
  };

  const setSizePercentage = (percentage) => {
    setCatSize(percentage);
    addToHistory("setSizePercentage", { size: percentage });
  };

  return (
    <CatContext.Provider
      value={{
        position,
        rotation,
        message,
        isVisible,
        catSize,
        setPosition,
        moveCat,
        rotateCat,
        moveCatBack,
        goToRandomPosition,
        say,
        sayForSeconds,
        think,
        replayAction,
        toggleVisibility,
        increaseSize,
        setSizePercentage,
        moveToInitialPosition
      }}
    >
      {children}
    </CatContext.Provider>
  );
};

export const useCat = () => useContext(CatContext);
