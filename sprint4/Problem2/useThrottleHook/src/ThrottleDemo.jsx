import React, { useState } from "react";
import { useThrottle } from "./useThrottle";

export default function ThrottleDemo() {
  const [input, setInput] = useState("");
  
  // Throttle the input with 1000ms delay
  const throttledInput = useThrottle(input, 1000);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Custom useThrottle Hook Demo</h2>

      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type here..."
        style={{ padding: "8px", width: "300px", marginBottom: "20px" }}
      />

      <div>
        <strong>Original Value:</strong> {input}
      </div>
      <div>
        <strong>Throttled Value (updates every 1s):</strong> {throttledInput}
      </div>
    </div>
  );
}
