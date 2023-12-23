import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Styles from "./MessageForm.module.css";
import { useSelector } from "react-redux";

function MessageForm() {
  const [message, setMessage] = useState("");

  function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    let month = (1 + date.getMonth()).toString();

    month = month.length > 1 ? month : "0" + month;
    let day = date.getDate().toString();

    day = day.length > 1 ? day : "0" + day;

    return month + "/" + day + "/" + year;
  }

  const user = useSelector((state) => state.userReducer);
  const handleSubmit = async () => {};
  return (
    <>
      <div className={Styles.messagesOutput}>
        {!user.isLoggedIn && (
          <div className="alert alert-danger">Please Login</div>
        )}
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
