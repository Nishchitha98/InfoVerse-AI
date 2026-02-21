import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function Home() {
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (!prompt.trim()) return;
    navigate("/result", { state: { topic: prompt } });
  };

  return (
    <div className="container">
      <h1>🤖 AI Information Generator</h1>

      <textarea
        placeholder="Ask anything..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />

      <button onClick={handleSearch}>🔎 Search</button>
    </div>
  );
}

export default Home;