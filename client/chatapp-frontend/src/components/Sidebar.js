import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { useSelector } from "react-redux";
import { AppContext } from "../context/appContext";
import URLS from "../utils/endpoint-urls";

function Sidebar() {
  const user = useSelector((state) => state.userReducer);

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

  if (!user.isLoggedIn) {
    return <></>;
  }

  return (
    <>
      <h2>Available rooms</h2>
      <ListGroup>
        {rooms.map((room, idx) => (
          <ListGroup.Item key={idx}>{room}</ListGroup.Item>
        ))}
      </ListGroup>
      <h2>Members</h2>
      <ListGroup>
        {members.map((member, idx) => (
          <ListGroup.Item key={idx} style={{ cursor: "pointer" }}>
            {member.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
