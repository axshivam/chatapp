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
            {room} {currentRoom !== room && <span></span>}
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
            {member.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </>
  );
}

export default Sidebar;
