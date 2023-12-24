import React, { useContext, useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Styles from "./MessageForm.module.css";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
 
function MessageForm() {
  const [message, setMessage] = useState("");

  const user = useSelector((state) => state.userReducer);
  const { socket, currentRoom, setMessages, messages, privateMemberMsg } =
    useContext(AppContext);

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message) return;
    const today = new Date();
    const minutes =
      today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes();
    const time = today.getHours() + ":" + minutes;
    const roomId = currentRoom;
    socket.emit("message-room", roomId, message, user, time, todayDate);
    setMessage("");
  };

  const todayDate = getFormattedDate();

  socket.off("room-messages").on("room-messages", (roomMessages) => {
    console.log("Room Messages:", roomMessages);
    setMessages(roomMessages);
  });

  // console.log("Messages Main", messages[0].messagesByDate[0].content);
  return (
    <>
      <div className={Styles.messagesOutput}>
        {!user.isLoggedIn && (
          <div className="alert alert-danger">Please Login</div>
        )}

        {user.isLoggedIn && messages.map(({_id: date, messagesByDate}, idx) => (
          <div key={idx}>
            <p className="alert alert-info text-center message-date-indicator">{date}</p>
            {messagesByDate?.map(({content, time, from: sender}, msgIdx) => (
              <div className="message" key={msgIdx}>
                <p>{content}</p>
                <p className="message-timestamp-left">{time}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <Row>
          <Col md={11}>
            <input
              type="text"
              placeholder="Your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={!user.isLoggedIn}
            />
          </Col>
          <Col md={1}>
            <Button
              variant="primary"
              type="submit"
              style={{ width: "100%", backgroundColor: "orange" }}
              disabled={!user.isLoggedIn}
            >
              <i className="fas fa-paper-plane"></i>
            </Button>
          </Col>
        </Row>
      </form>
    </>
  );
}

export default MessageForm;
