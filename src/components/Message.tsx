// src/components/Message.tsx
import React, { Fragment } from "react";
import { MessageDto } from "../models/MessageDto";

interface MessageProps {
  message: MessageDto;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  return (
    <div style={{ textAlign: message.isUser ? "right" : "left", margin: "8px" }}>
      <div
        style={{
          color: message.isUser ? "#000000" : "#000000",
          backgroundColor: message.isUser ? "#94c6c8" : "#F5F5F5",
          padding: "15px",
          borderRadius: "8px",
        }}
      >
        {message.content.split("\n").map((text, index) => (
          <Fragment key={index}>
            {text}
            <br />
          </Fragment>
        ))}
      </div>
    </div>
  );
};

export default Message;