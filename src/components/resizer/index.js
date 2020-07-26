import React, { useRef, useState } from "react";
import { debounce } from "debounce";
import "./styles.css";

const Resizer = () => {
  const [boxSize, setBoxSize] = useState({
    first: "",
    second: ""
  });
  const [dragStart, setDragStart] = useState(false);

  const resizeContainerRef = useRef(0);
  const calculateSize = e => {
    e.preventDefault();

    const getContainerSize = () => {
      const parentWidth = resizeContainerRef.current.getBoundingClientRect()
        .width;

      const first = parentWidth - e.clientX;
      const second = e.clientX;
      console.log(first, second);
      setBoxSize({
        first,
        second
      });
    };

    if (e.clientX !== 0) {
      getContainerSize();
    }
  };

  return (
    <div className="resizer-container flex" ref={resizeContainerRef}>
      <div
        className="resize-section first"
        style={{
          width: boxSize.second + "px"
        }}
      >
        secton 1
      </div>
      <div
        className="resizer"
        draggable="true"
        onDragStart={() => setDragStart(true)}
        onDragEnd={() => setDragStart(false)}
        onDrag={e => debounce(calculateSize(e), 300)}
        style={{
          backgroundColor: dragStart ? "blue" : "coral"
        }}
      ></div>
      <div
        className="resize-section second"
        style={{
          width: boxSize.first + "px"
        }}
      >
        secton 2
      </div>
    </div>
  );
};

export default Resizer;
