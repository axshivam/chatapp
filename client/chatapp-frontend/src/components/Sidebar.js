import React, { useContext, useEffect } from "react";
import { ListGroup, Row, Col } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import URLS from "../utils/endpoint-urls";
import { addNotifications, resetNotifications } from "../redux/actions";
import { useDispatch } from "react-redux";
import Styles from "./Sidebar.module.css";

function Sidebar() {
  const user = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();

  const {
    socket,
    setMembers,
    members,
    setCurrentRoom,
    setRooms,
    privateMemberMsg,
    rooms,
    setPrivateMemberMsg,
    currentRoom,
  } = useContext(AppContext);

  const joinRoom = (room, isPublic = true) => {
    if (!user.isLoggedIn) {
      return alert("Please Login");
    }

    socket.emit("join-room", room);

    setCurrentRoom(room);

    if (isPublic) {
      setPrivateMemberMsg(null);
    }

    // dispatch for notifications

    dispatch(resetNotifications(room));

    socket.off("notifications").on("notifications", (room) => {
      dispatch(addNotifications(room));
    });
  };

  useEffect(() => {
    if (user.isLoggedIn) {
      setCurrentRoom("general");
      getRooms();

      socket.emit("join-room", "general");

      socket.emit("new-user");
    }
  }, []);

  socket.off("new-user").on("new-user", (payload) => {
    console.log("Socket:", payload);
    setMembers(payload);
  });

  const getRooms = async () => {
    const response = await fetch(`${URLS.BASE_URL}/rooms`);

    const rooms = await response.json();

    console.log("Rooms:", rooms);

    setRooms(rooms);
  };

  const orderIds = (id1, id2) => {
    if (id1 > id2) {
      return id1 + "-" + id2;
    } else {
      return id2 + "-" + id1;
    }
  };

  const handlePrivateMemberMsg = async (member) => {
    setPrivateMemberMsg(member);

    setPrivateMemberMsg(member);
    const roomId = orderIds(user._id, member._id);
    joinRoom(roomId, false);
  };

  if (!user.isLoggedIn) {
    return <></>;
  }

  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item
            key={idx}
            onClick={() => joinRoom(room)}
            active={room === currentRoom}
            style={{
              cursor: "pointer",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            {room}{" "}
            {currentRoom !== room && (
              <span className="badge rounded-pill  bg-primary">
                {user.newMessages[room] ? user.newMessages[room] : ""}
              </span>
            )}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      <ListGroup>
        {members.map((member, idx) => (
          <ListGroup.Item
            key={idx}
            style={{ cursor: "pointer" }}
            active={privateMemberMsg?._id == member?._id}
            onClick={() => handlePrivateMemberMsg(member)}
            disabled={member?._id === user._id}
          >
            <Row>
              <Col xs={2} className={Styles.memberStatus}>
                <img src={member.picture} className={Styles.memberStatusImg} />
                {member.status == "online" ? (
                  <i
                    className={`${Styles.sidebarOnlineStatus} fas fa-circle`}
                  ></i>
                ) : (
                  <i
                    className={`${Styles.sidebarOfflineStatus} fas fa-circle`}
                  ></i>
                )}
              </Col>
              <Col xs={9}>
                {member.name}
                {member._id === user?._id && " (You)"}
                {member.status == "offline" && " (Offline)"}
              </Col>
              <Col xs={1}>
                <span className="badge rounded-pill bg-primary">
                  {user.newMessages[orderIds(member._id, user._id)]
                    ? user.newMessages[orderIds(member._id, user._id)]
                    : ""}
                </span>
              </Col>
            </Row>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
