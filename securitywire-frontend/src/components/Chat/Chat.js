import React, { useEffect, useRef, useState } from "react";
import { Button, Input } from "semantic-ui-react";
import { useDispatch, useSelector } from "react-redux";
import socketio from "socket.io-client";
import { getMessages } from "../../actions";
import { css } from "@emotion/css";
import ScrollToBottom from "react-scroll-to-bottom";

const ROOT_CSS = css({
  height: "30em",
  width: "180%",
  display: "flex",
  flexDirection: "column",
  // overflow:'scroll'
});

const Chat = ({ user2 }) => {
  const socket = socketio.connect("http://localhost:8000");
  const { user } = useSelector((state) => state.auth.data.data);
  const chatroomId = 1000;
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userId, setUserId] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("USER2 ID ", user2);
    dispatch(getMessages(user2._id)).then((res) => {
      if (res && res.data) {
        console.log("I am response", res);
        const messagesLocal = res.data.chat;
        setMessages(messagesLocal);
      }
    });
  }, []);

  const sendMessage = (e) => {
    console.log("Submitted");
    e.preventDefault();
    if (socket) {
      socket.emit("chatroomMessage", {
        chatroomId,
        user1: user._id,
        user2: user2._id,
        message,
      });
      setMessage("");
    }
  };

  React.useEffect(() => {
    if (socket) {
      socket.on("newMessage", ({ chat }) => {
        console.log("new message recieved", chat);
        setMessages((prevState) => [...prevState, chat]);
      });
    }
  }, [messages]);

  React.useEffect(() => {
    if (socket) {
      socket.emit("joinRoom", {
        chatroomId,
      });
    }

    return () => {
      //Component Unmount
      if (socket) {
        socket.emit("leaveRoom", {
          chatroomId,
        });
      }
    };
  }, []);

  return (
    <div style={{ height: "50%" }}>
      <ScrollToBottom className={ROOT_CSS}>
        {messages.map((message, idx) => {
          return user._id.toString() === message.user1.toString() ? (
            <p
              style={{
                maxWidth: "30%",
                textAlign: "center",
                marginLeft: "25%",
              }}
            >
              <p
                key={idx}
                style={{
                  padding: "5px",
                  borderRadius: "10px",
                  background: "#370665",
                  color: "white",
                  marginRight: "2em",
                }}
              >
                {message.message}
              </p>
              <span
                style={{
                  color: "grey",
                  marginTop: "-10px",
                  marginRight: "2em",
                  display: "flex",
                  justifyContent: "flex-end",
                }}
              >
                you
              </span>
            </p>
          ) : (
            <p
              key={idx}
              style={{
                background: "#35589A",
                padding: "5px",
                borderRadius: "10px",
                color: "white",
                marginRight: "2em",
                maxWidth: "30%",
                alignSelf: "flex-start",
                marginLeft: "2em",
              }}
            >
              {message.message}
            </p>
          );
        })}
      </ScrollToBottom>

      <form onSubmit={(e) => sendMessage(e)}>
        <Input
          style={{ width: "80%" }}
          focus
          placeholder="enter message to send..."
          value={message}
          onChange={(e) => {
            e.preventDefault();
            setMessage(e.target.value);
          }}
        />
        <Button
          style={{ marginLeft: "5px" }}
          color="blue"
          type="submit"
          onClick={(e) => sendMessage(e)}
        >
          send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
