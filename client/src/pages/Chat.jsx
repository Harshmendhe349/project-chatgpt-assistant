import React, { useContext, useState } from "react";
import { Container } from "react-bootstrap";
import { AuthContext } from "../context/AuthContext";
import { baseUrl, postRequest } from "../utils/service";

const MAX_RETRIES = 5;
const DELAY_BASE = 1000;

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [inputMessage, setInputMessage] = useState("");
  const [chatbotResponse, setChatbotResponse] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (e) => {
    setInputMessage(e.target.value);
  };

  const handleSendMessage = async () => {
    if (inputMessage && !isSending) {
      setIsSending(true); 
      try {
        const response = await postRequest(`${baseUrl}/chat`, JSON.stringify({ message: inputMessage }));
        setChatbotResponse(response.response);
        setInputMessage(""); 
      } catch (error) {
        if (error.response && error.response.status === 429) {
          const delay = Math.pow(2, MAX_RETRIES - 1) * DELAY_BASE;
          setTimeout(() => {
            handleSendMessage();
          }, delay);
        } else {
          console.error("Server error:", error);
        }
      }
    }
  };

  return (
    <Container>
      <h1>
        {!user?.isVerified ? (
          <div>
            <span className="verified">Hello {user.first_name}</span>
            <h3>Enter your question here</h3>
            <input
              type="text"
              value={inputMessage}
              onChange={handleInputChange}
              style={{
                borderRadius: '8px', 
                padding: '20px', 
                height: '40px' 
              }}
            />
            <button 
            onClick={handleSendMessage} 
            style={{borderRadius:'10px',
            marginLeft:'10px',
            padding:'10px',
            fontSize: '25px'
            }}
            >Submit</button>
            {chatbotResponse && (
              <div className="chatbot-response">
                <p>{chatbotResponse}</p>
              </div>
            )}
          </div>
        ) : (
          <span className="not-verified">Please verify your account</span>
        )}
      </h1>
    </Container>
  );
};

export default Chat;
