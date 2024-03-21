// src/components/Chat.tsx
import React, { useEffect, useState, useRef } from "react";

import { TextField, Button, Container, Grid, LinearProgress, CircularProgress } from "@mui/material";
import Message from "./Message";
import OpenAI from "openai";
import { MessageDto } from "../models/MessageDto";
import SendIcon from "@mui/icons-material/Send";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const Chat: React.FC = () => {
  const [isWaiting, setIsWaiting] = useState<boolean>(false);
  const [messages, setMessages] = useState<Array<MessageDto>>(new Array<MessageDto>());
  const [input, setInput] = useState<string>("");
  const [assistant, setAssistant] = useState<any>(null);
  const [thread, setThread] = useState<any>(null);
  const [openai, setOpenai] = useState<any>(null);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  // Create a ref for the input element
  const inputRef = useRef<HTMLInputElement>(null);

  // This effect runs whenever messages state changes
  useEffect(() => {
    scrollToBottom();
  }, [messages]); // Listening for changes in messages array

  useEffect(() => {
    initChatBot();
  }, []);

  useEffect(() => {
    setMessages([
      {
        content: "Hi, I'm Rich, your personal financial advisory assistant. How may I help you?*",
        isUser: false,
      },
    ]);
  }, [assistant]);

  useEffect(() => {
    // After messages update or on component mount, focus the input
    // Triggers when 'messages' state changes
    inputRef.current?.focus();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // Define a custom theme to change the highlight color
  const chatBoxTheme = createTheme({
    palette: {
      primary: {
        main: '#7ebcb4', // Replace with the desired highlight color
      },
    },
  });

  const initChatBot = async () => {
    const openai = new OpenAI({
      apiKey: process.env.REACT_APP_OPENAI_API_KEY,
      dangerouslyAllowBrowser: true,
    });
  
    // Create an assistant
    const assistant = await openai.beta.assistants.create({
      name: "Rich General Assistant deploy-poc-v1",
      instructions: process.env.REACT_APP_RICH_GENERAL_ASST_PROMPT_B,
      tools: [{ type: "code_interpreter" }],
      model: "gpt-4-1106-preview",
    });

    // Create a thread
    const thread = await openai.beta.threads.create();

    setOpenai(openai);
    setAssistant(assistant);
    setThread(thread);
  };

  const createNewMessage = (content: string, isUser: boolean) => {
    const newMessage = new MessageDto(isUser, content);
    return newMessage;
  };

  // const handleSendMessage = async () => {
  //   messages.push(createNewMessage(input, true));
  //   setMessages([...messages]);
  //   setInput("");

  const handleSendMessage = async () => {
    const newMessages = [...messages, createNewMessage(input, true)];
    setMessages(newMessages);
    setInput("");
    setIsWaiting(true);

    // Send a message to the thread
    await openai.beta.threads.messages.create(thread.id, {
      role: "user",
      content: input,
    });

    let assistantResponseBuffer = '';

    // Run the assistant
    // const run = await openai.beta.threads.runs.create(thread.id, {
    //   assistant_id: assistant.id,
    // });

    const run = openai.beta.threads.runs.createAndStream(thread.id, {
      assistant_id: assistant.id
    })
      .on('textCreated', (text) => {
        // This is where you would handle full text responses that have been completed
        // For simplicity, we're not doing anything with this event right now
      })
      .on('textDelta', (textDelta) => {
        // This event gives us incremental updates to the assistant's response
        // We'll use this to update the UI in real-time as the response is being generated
        assistantResponseBuffer += textDelta.value;
      })
      .on('toolCallCreated', (toolCall) => {
        // Handle the start of a tool call like code execution
        // Not needed for this simple example, but you can implement something here if necessary
      })
      .on('toolCallDelta', (toolCallDelta) => {
        // Handle updates from tool calls
        // You would process code execution results and other tool call outputs here
        // For now, we'll ignore this in our example
      })
      .on('error', (error) => {
        // Handle any errors that occur during the streaming
        console.error('Streaming error:', error);
        setIsWaiting(false);
      })
      .on('end', () => {
        // The stream has ended, possibly because the assistant's response is complete
        // Here we reset the waiting state to allow for new input
        setIsWaiting(false);
        // Add the full assistant's response to the messages
        setMessages(prevMessages => [...prevMessages, createNewMessage(assistantResponseBuffer, false)]); 
      });
  
    // Since we're using streaming, there's no need to poll for a response
    // The response will come in via the 'textDelta' event and update the UI in real-time

    // Create a response
    //let response = await openai.beta.threads.runs.retrieve(thread.id, run.id);

    // Wait for the response to be ready
    // while (response.status === "in_progress" || response.status === "queued") {
    //   console.log("waiting...");
    //   setIsWaiting(true);
    //   await new Promise((resolve) => setTimeout(resolve, 30000));
    //   response = await openai.beta.threads.runs.retrieve(thread.id, run.id);
    // }

    //setIsWaiting(false);

    // Get the messages for the thread
    const messageList = await openai.beta.threads.messages.list(thread.id);

    // Find the last message for the current run
    const lastMessage = messageList.data
      .filter((message: any) => message.run_id === run.id && message.role === "assistant")
      .pop();

    // Print the last message coming from the assistant
    if (lastMessage) {
      console.log(lastMessage.content[0]["text"].value);
      setMessages([...messages, createNewMessage(lastMessage.content[0]["text"].value, false)]);
    }
  };

  // detect enter key and send message
  const handleKeyPress = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <ThemeProvider theme={chatBoxTheme}>
    <Container>
      <Grid container direction="column" spacing={2} paddingBottom={2}>
        {messages.map((message, index) => (
          <Grid item alignSelf={message.isUser ? "flex-end" : "flex-start"} key={index}>
            <Message key={index} message={message} />
          </Grid>
        ))}
      </Grid>
      <Grid container direction="row" paddingBottom={5} justifyContent={"space-between"}>
        <Grid item sm={11} xs={9}>
          <TextField
            inputRef={inputRef} 
            label="Type your message"
            variant="outlined"
            disabled={isWaiting}
            fullWidth
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
          />
          {isWaiting && <LinearProgress color="inherit" />}
        </Grid>
        <Grid item sm={1} xs={3} paddingLeft={0.2}>
        <Button
          variant="contained"
          size="large"
          style={{
            backgroundColor: '#7ebcb4', // Replace with your desired color code
            color: '#textColor' // Replace with the text color you want
          }}
          onClick={handleSendMessage}
          disabled={isWaiting}
        >
          {isWaiting && <CircularProgress style={{ color: '#abd1bc' }} />}
          {!isWaiting && <SendIcon style={{ color: '#textColor' }} fontSize="large" />}
        </Button>
        </Grid>
      </Grid>
      <div ref={messagesEndRef} /> {/* This is the anchor for scrolling to the bottom */}
    </Container>
    </ThemeProvider>
  );
};

export default Chat;
