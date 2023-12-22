import React, { useState } from "react";
import { Row, Col, Button } from "react-bootstrap";
import Styles from "./MessageForm.module.css";

function MessageForm() {
  const [message, setMessage] = useState("");
  const handleSubmit = async () => {};
  return (
    <>
      <div className={Styles.messagesOutput}></div>
        <form onSubmit={handleSubmit}>
          <Row>
            <Col md={11}>
              <input
                type="text"
                placeholder="Your message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </Col>
            <Col md={1}>
              <Button
                variant="primary"
                type="submit"
                style={{ width: "100%", backgroundColor: "orange" }}
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
