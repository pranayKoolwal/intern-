import React, { useEffect, useState } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file
import { MdOutlineModeEdit } from "react-icons/md";
const API_KEY = "AIzaSyC1nFL8hKxzm5xQHC0lMRRlNv7kul8AXpA"; // Replace with your actual API Key

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem("messages"));
    if (storedMessages && storedMessages.length > 0) {
      setMessages(storedMessages);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input) return;
    setLoading(true);

    const userMessage = { text: input, sender: "user" };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const res = await axios.post(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
        {
          contents: [{ parts: [{ text: input }] }],
        }
      );

      const botMessage = {
        text: res.data.candidates[0]?.content.parts[0]?.text || "No response.",
        sender: "bot",
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = { text: "Error fetching response. Please try again.", sender: "bot" };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }

    setLoading(false);
    setInput("");
  };

  const handleEdit = (text) => {
    setInput(text);
  };

  return (
    <>
      <div className="first">
        How Can I Help You JANNAB...
      </div>
      <div className="chat-container">
        <h2>Hola-Buddy</h2>
        {messages.length > 0 && (
          <div className="chat-box" >
            {messages.map((message, index) => (
              <div key={index} style={{position:'relative'}} className={`chat-message ${message.sender}`}>
                  {message.sender === "user" && (
                  <button  className="edit-button" style={{position:'absolute' , left:'5px'}} onClick={() => handleEdit(message.text)}>
                  
                   <MdOutlineModeEdit fontSize={'16px'} style={{position:'relative' , top:'-05px '}} />
                  </button>
                )}
                {message.text}
              
              </div>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="chat-form">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me something..."
            className="chat-input"
          />
          <button type="submit" disabled={loading} className="chat-button">
            {loading ? "Thinking..." : "Ask"}
          </button>
        </form>
      </div>
    </>
  );
};

export default App;
